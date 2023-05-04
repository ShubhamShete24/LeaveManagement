import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import User from '../models/user.js';
import PersonalDetails from '../models/personalDetails.js';
import EducationDetails from '../models/educationalDetails.js';
import BankDetails from '../models/bankDetails.js';
import EmploymentDetails from '../models/employmentDetails.js';

dotenv.config();

const { JWT_SECRET_KEY } = process.env;
const generateHash = (plainText, salt) => crypto.pbkdf2Sync(plainText, salt, 1000, 64, 'sha512').toString('hex');
const verifyHash = (hash, salt, plainText) =>
  crypto.pbkdf2Sync(plainText, salt, 1000, 64, 'sha512').toString('hex') === hash;

// createUser
const createUser = async (req, res) => {
  let user = req.body;
  const responseData = {
    status: 0,
    data: null,
    message: ''
  };
  try {
    if (!user.password || !user.email || !user.name) {
      responseData.status = 400;
      responseData.message = 'Required attributes not suppied.';
      res.send(responseData);
    }
    const uniqueSalt = crypto.randomBytes(16).toString('hex');
    const hash = generateHash(user.password, uniqueSalt);
    delete user.password;
    user = { ...user, salt: uniqueSalt };
    user = { ...user, hash };

    const userCreated = await User.create(user);
    if (userCreated) {
      responseData.status = 201;
      responseData.message = 'User has been created.';
      responseData.data = userCreated;
    } else {
      res.send(responseData);
    }
  } catch (err) {
    responseData.status = 500;
    responseData.message = err.message;
  }
  res.send(responseData);
};

const authenticate = async (req, res) => {
  const responseData = {
    status: 0,
    data: {
      message: '',
      user: null,
      authToken: ''
    }
  };
  const { email, password } = req.body;
  const user = await User.aggregate([
    {
      $match: {
        email
      }
    },
    {
      $lookup: {
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'role'
      }
    }
  ]);
  if (user.length !== 0) {
    if (verifyHash(user[0]?.hash, user[0]?.salt, password)) {
      responseData.data.message = 'User found';
      responseData.status = 200;
      const token = jsonwebtoken.sign({ userInfo: user[0] }, JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_SESSION_TIMEOUT
      });
      responseData.data.user = user;
      responseData.data.authToken = token;
    } else {
      responseData.data.message = 'Invalid password';
      responseData.status = 401;
    }
  } else {
    responseData.data.message = 'User not found';
    responseData.status = 404;
  }
  res.status(responseData.status).send(responseData.data);
};

const updateUserInfo = async (req, res) => {
  let { userInfo } = req.body;
  delete userInfo.role;
  const responseData = {
    status: 0,
    message: '',
    data: null
  };
  const { updatePassword } = req.body;
  if (!updatePassword) {
    // logic for regenrating the hash
    delete userInfo.password;
  } else {
    const uniqueSalt = crypto.randomBytes(16).toString('hex');
    const hash = generateHash(userInfo.password, uniqueSalt);
    userInfo = { ...userInfo, hash };
    userInfo = { ...userInfo, salt: uniqueSalt };
    delete userInfo.password;
  }

  const updatedUser = await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userInfo.id) }, userInfo, {
    new: true
  });
  responseData.status = 200;
  responseData.message = 'User details updated successfully.';
  responseData.data = updatedUser;
  res.send(responseData);
};

// follow single responsibility
const assignRole = async (req, res) => {
  const responseData = {
    status: 0,
    message: '',
    data: null
  };
  try {
    const { userId, roleId } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { role: new mongoose.Types.ObjectId(roleId) },
      { new: true }
    );
    if (updatedUser === null) {
      responseData.status = 404;
      responseData.message = 'User not found';
    } else {
      responseData.data = {
        roleUpdatedTo: updatedUser?.role
      };
      responseData.status = 200;
      responseData.message = 'Role updated';
    }
  } catch (e) {
    responseData.status = 406;
    responseData.message = `The request could not be completed :${e.message}`;
  }
  res.send(responseData);
};

// assign Manager
const assignManager = async (req, res) => {
  const responseData = {
    status: 0,
    message: '',
    data: null
  };
  const { userId, managerId } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { reportingManager: new mongoose.Types.ObjectId(managerId) },
      { new: true }
    );
    if (updatedUser === null) {
      responseData.status = 404;
      responseData.message = 'User not found';
    } else {
      responseData.data = {
        managerIdAssigned: updatedUser?.reportingManager
      };
      responseData.status = 200;
      responseData.message = 'Manager assigned';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.message = `Manager assignment failed! ${e.message}`;
  }
  res.send(responseData);
};

// get Users
const getUsers = async (req, res) => {
  let responseData = {
    status: 0,
    message: '',
    data: null
  };
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'reportingManager',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1
              }
            }
          ],
          as: 'reportingManager'
        }
      },
      {
        $lookup: {
          from: 'personalDetails',
          localField: 'personalDetailsId',
          foreignField: '_id',
          as: 'personalDetails'
        }
      },
      {
        $lookup: {
          from: 'employmentDetails',
          localField: 'employmentDetails',
          foreignField: '_id',
          as: 'employeeDetails'
        }
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: 'roles'
        }
      }
    ]);

    responseData.data = users;
    responseData.message = 'Users found!';
    responseData.status = 200;
    res.send(responseData);
  } catch (e) {
    responseData = {
      status: 500,
      message: e,
      data: null
    };
    res.send(responseData);
  }
};

// Personal Details
const createPersonalDetails = async (req, res) => {
  const personalDetails = req.body;
  try {
    // Add educational details field
    const educationalDetails = await EducationDetails.create(req.body.educationalDetails);
    personalDetails.educationalDetails = educationalDetails.id;
    // Add bank details field
    const bankDetails = await BankDetails.create(req.body.bankDetails);
    personalDetails.bankDetails = bankDetails.id;

    const newPersonalDetails = await PersonalDetails.create(personalDetails);
    if (newPersonalDetails != null) {
      res.status(201).json({
        status: 1,
        message: 'Personal details created successfully!',
        data: newPersonalDetails
      });
    } else {
      res.status(500).json({
        status: 0,
        message: 'There is some problem while creating the personal details.'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `Failed to create the personal details. Error message: ${error.message}`
    });
  }
};

const createEmployeeDetails = async (req, res) => {
  try {
    const { joiningDate, department, designation, project, employeeType } = req.body;

    if (!joiningDate || !department || !designation) {
      res.status(400).json({ message: 'Missing required fields' });
    }

    const newEmploymentDetails = new EmploymentDetails({
      joiningDate,
      department,
      designation,
      project,
      employeeType
    });

    const savedEmploymentDetails = await newEmploymentDetails.save();

    if (!savedEmploymentDetails) {
      res.status(500).json({ message: 'Failed to create employment details' });
    }
    res.status(201).json(savedEmploymentDetails);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  createUser,
  authenticate,
  updateUserInfo,
  assignRole,
  assignManager,
  getUsers,
  createPersonalDetails,
  createEmployeeDetails
};
