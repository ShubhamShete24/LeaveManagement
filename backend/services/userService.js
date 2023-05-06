import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import User from '../models/user.js';
import PersonalDetails from '../models/personalDetails.js';
import EducationDetails from '../models/educationalDetails.js';
import BankDetails from '../models/bankDetails.js';
import EmploymentDetails from '../models/employmentDetails.js';
import LeaveBalance from '../models/leaveBalance.js';

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
  let userCreated = null;
  const leavesBalanceCreatedIds = [];
  try {
    if (!user.password || !user.email || !user.name || !user.reportingManager || !user.role) {
      responseData.status = 400;
      responseData.message = 'Required attributes not suppied.';
      res.send(responseData);
    }
    const uniqueSalt = crypto.randomBytes(16).toString('hex');
    const hash = generateHash(user.password, uniqueSalt);
    delete user.password;
    user = { ...user, salt: uniqueSalt };
    user = { ...user, hash };
    const objIdReportingManager = new mongoose.Types.ObjectId(user.reportingManager);
    const objIdRole = new mongoose.Types.ObjectId(user.role);
    user = { ...user, reportingManager: objIdReportingManager };
    user = { ...user, role: objIdRole };
    userCreated = await User.create(user);
    if (userCreated) {
      const userData = userCreated.toObject();
      delete userData.hash;
      delete userData.salt;
      responseData.status = 201;
      responseData.message = 'User has been created.';
      responseData.data = userData;
    } else {
      responseData.status = 500;
      responseData.message += 'User could not be created';
      responseData.data = null;
    }
  } catch (err) {
    responseData.status = 500;
    responseData.message = err.message;
  }
  if (responseData.status !== 201 && userCreated !== null) {
    // rollback
    await User.findOneAndDelete({ _id: userCreated._id });
    leavesBalanceCreatedIds.forEach(async (record) => {
      await LeaveBalance.findOneAndDelete({ _id: record._id });
    });
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
  const { personalDetails, educationalDetails, bankDetails, userId } = req.body;
  try {
    // Add educational details field
    const newEducationalDetails = await EducationDetails.create(educationalDetails);
    personalDetails.educationalDetails = newEducationalDetails._id;
    // Add bank details field
    const newBankDetails = await BankDetails.create(bankDetails);
    personalDetails.bankDetails = newBankDetails._id;
    const newPersonalDetails = await PersonalDetails.create(personalDetails);
    if (newPersonalDetails != null) {
      await User.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(userId) },
        {
          personalDetailsId: newPersonalDetails._id
        },
        { new: true }
      );
      res.status(201).json({
        message: 'Personal details created successfully!',
        data: { _id: userId, personalDetailsId: newPersonalDetails._id }
      });
    } else {
      res.status(400).json({
        message: 'Failed to create the personal details.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Failed to create the personal details. Error message: ${error.message}`
    });
  }
};

// Employment Details
const createEmploymentDetails = async (req, res) => {
  const { joiningDate, department, designation, project, employeeType, userId } = req.body;

  if (!joiningDate || !department || !designation) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const requestData = new EmploymentDetails({
      joiningDate,
      department,
      designation,
      project,
      employeeType
    });
    const newEmploymentDetails = await requestData.save();
    if (newEmploymentDetails != null) {
      await User.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(userId) },
        {
          employmentDetails: newEmploymentDetails._id
        },
        { new: true }
      );
      return res.status(201).json({
        data: { _id: userId, employmentDetailsId: newEmploymentDetails._id },
        message: 'Employment details created successfully!'
      });
    }
    return res.status(400).json({ message: 'Failed to create employment details' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUsersBasedOnCondition = async (req, res) => {
  const responseData = {
    status: 0,
    message: '',
    data: {
      message: '',
      users: null
    }
  };
  const { attribute, value } = req.body;
  try {
    let users = [];
    switch (attribute) {
      case 'role': {
        users = await User.aggregate([
          {
            $lookup: {
              from: 'roles',
              localField: 'role',
              foreignField: '_id',
              as: 'role'
            }
          },
          {
            $match: {
              'role.roleName': value
            }
          },
          {
            $project: {
              role: 1,
              name: 1,
              email: 1,
              _id: 1,
              reportingManager: 1
            }
          }
        ]);
        break;
      }
      default: {
        responseData.status = 404;
        responseData.message += 'No such attrbute is taken into consideration for searching users.';
        break;
      }
    }
    if (users?.length === 0) {
      responseData.status = 404;
      responseData.message += 'No records found';
    } else {
      responseData.status = 200;
    }
    responseData.data.users = users;
  } catch (e) {
    responseData.data.message += `There was an exception : ${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

export {
  createUser,
  authenticate,
  updateUserInfo,
  assignRole,
  assignManager,
  getUsers,
  createPersonalDetails,
  createEmploymentDetails,
  getUsersBasedOnCondition
};
