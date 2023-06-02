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
import LeaveType from '../models/leaveType.js';
import leaveTypesMap from '../constants/leaveTypes.js';
import Counter from '../models/counter.js';
import { EMPIDCHAR, PADDER, RANDOM_BYTES_CHARACTERS } from '../constants/constants.js';
import { BAD_REQUEST, CREATED, NOT_FOUND, SERVER_ERROR, SUCCESS, UNAUHTORIZED_ACCESS } from '../constants/response.js';
import { sendEmail } from './notificationlService.js';

dotenv.config();

const { JWT_SECRET_KEY } = process.env;
const generateHash = (plainText, salt) => crypto.pbkdf2Sync(plainText, salt, 1000, 64, 'sha512').toString('hex');
const verifyHash = (hash, salt, plainText) =>
  crypto.pbkdf2Sync(plainText, salt, 1000, 64, 'sha512').toString('hex') === hash;

// createUser
const createUser = async (req, res) => {
  let user = req.body;
  const responseData = {
    status: SUCCESS,
    data: null,
    message: ''
  };
  let userCreated = null;
  const leavesBalanceCreatedIds = [];
  try {
    if (!user.password || !user.email || !user.name || !user.reportingManager || !user.role) {
      responseData.status = BAD_REQUEST;
      responseData.message = 'Required attributes not suppied.';
      res.status(responseData.status).send(responseData);
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
    const counter = await Counter.findOneAndUpdate({ name: 'counter' }, { $inc: { index: 1 } }, { new: true });
    // create employee id
    const empId = `${EMPIDCHAR}${counter.index.toString().padStart(PADDER, 0)}`;
    user = { ...user, employeeId: empId };
    userCreated = await User.create(user);

    if (userCreated !== null) {
      console.log('[*] User created');
      const userData = userCreated.toObject();
      delete userData.hash;
      delete userData.salt;
      const leaveTypes = await LeaveType.find({});
      if (leaveTypes?.length !== 0) {
        console.log(`[*] Found leave types. Trying to create respective leave balances.`);
      } else {
        console.log(`[*] No leave types found. `);
      }
      let count = 0;
      for (let index = 0; index < leaveTypes.length; index += 1) {
        const record = leaveTypes[index];
        let leaveBalance = record.leavesAllowed;
        if (leaveTypesMap.Annual === record.leaveType) {
          leaveBalance /= 12;
        }
        try {
          // eslint-disable-next-line no-await-in-loop
          const leaveBalanceCreated = await LeaveBalance.create({
            leaveTypeId: new mongoose.Types.ObjectId(record._id),
            leaveBalance,
            userId: userCreated._id,
            leaveBalanceUpdatedForMonth: new Date().getMonth()
          });
          if (leaveBalanceCreated != null) {
            console.log(`[*] Leave balance created for leaveType : ${record.leaveType} `);
            leavesBalanceCreatedIds.push(leaveBalanceCreated._id);
            count += 1;
          } else {
            console.log('[*] Could not create leave balance. Breaking.');
            responseData.message += 'leaveBalance Validation failed';
            responseData.status = BAD_REQUEST;
            count = 0;
            break;
          }
        } catch (e) {
          console.log(`[*] There was an exception while trying to create leave balance : ${e.message}`);
          responseData.message += e.message;
          responseData.status = BAD_REQUEST;
          console.log(e);
          count = 0;
          break;
        }
      }
      if (leaveTypes.length === count) {
        console.log('[*] Leave balances created for each leavetypes! User creation process completed.');
        responseData.data = userCreated;
        responseData.message = 'User has been created.';
        responseData.status = CREATED;
      } else {
        console.log('[*] User could not be created due to difference in leave types and leave balance created');
        responseData.status = BAD_REQUEST;
        responseData.message = 'User could not be created ';
        responseData.data = null;
      }
    } else {
      console.log('[*] User could not be created due to difference in leave types and leave balance created');
      responseData.status = SERVER_ERROR;
      responseData.message += 'User could not be created';
      responseData.data = null;
    }
  } catch (err) {
    console.log(`[*] User could not be created due to an exception : ${err.message}`);
    responseData.status = SERVER_ERROR;
    responseData.message = err.message;
  }
  if (responseData.status !== CREATED && userCreated !== null) {
    // rollback
    console.log(`[*] Rolling back all the changes`);
    await User.findOneAndDelete({ _id: userCreated._id });
    leavesBalanceCreatedIds.forEach(async (record) => {
      await LeaveBalance.findOneAndDelete({ _id: record._id });
    });
    // respndata
    responseData.status = BAD_REQUEST;
    responseData.message += 'User could not be created. Due  to some problem we had to roll back';
    responseData.data = null;
  }
  res.status(responseData.status).send(responseData);
};

// Delete user
/**
 * Here as of now we are not hard deleting user. We are just marking a user as delete.
 */
const deleteUser = async (req, res) => {
  const responseData = {
    status: 0,
    message: ''
  };

  const { userId } = req.body;
  try {
    const deletedUser = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { isDeleted: true },
      { new: true }
    );
    if (deletedUser != null) {
      console.log(`[*] User deleted successfully.`);
      responseData.status = 204;
    } else {
      console.log(`[*] User not found`);
      responseData.status = 404;
      responseData.message = 'User not found';
    }
  } catch (e) {
    console.log(`[*] User could not be deleted because of an exception : ${e.message} `);
    responseData.status = 500;
    responseData.message = e.message;
  }
  res.status(responseData.status).send(responseData);
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
      responseData.status = SUCCESS;
      const token = jsonwebtoken.sign({ userInfo: user[0] }, JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_SESSION_TIMEOUT
      });
      responseData.data.user = user;
      responseData.data.authToken = token;
    } else {
      responseData.data.message = 'Invalid password';
      responseData.status = UNAUHTORIZED_ACCESS;
    }
  } else {
    responseData.data.message = 'User not found';
    responseData.status = NOT_FOUND;
  }
  res.status(responseData.status).send(responseData.data);
};

const updateUserInfo = async (req, res) => {
  const userInfo = req.body;
  const responseData = {
    status: 0,
    message: ''
  };
  try {
    const updatedUser = await User.findOneAndUpdate({ email: userInfo.email }, userInfo, {
      new: true
    });
    if (updatedUser !== null) {
      responseData.status = SUCCESS;
      responseData.message = 'User details updated successfully.';
    } else {
      responseData.status = BAD_REQUEST;
      responseData.message = 'User details could not be found or there must been some other issue.';
    }
  } catch (e) {
    responseData.message += `There was an exception. ${e.message}`;
  }
  res.status(responseData.status).send(responseData);
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
      responseData.status = NOT_FOUND;
      responseData.message = 'User not found';
    } else {
      responseData.data = {
        roleUpdatedTo: updatedUser?.role
      };
      responseData.status = SUCCESS;
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
      responseData.status = NOT_FOUND;
      responseData.message = 'User not found';
    } else {
      responseData.data = {
        managerIdAssigned: updatedUser?.reportingManager
      };
      responseData.status = SUCCESS;
      responseData.message = 'Manager assigned';
    }
  } catch (e) {
    responseData.status = SERVER_ERROR;
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
        $unwind: {
          path: '$reportingManager',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'personaldetails',
          localField: 'personalDetails',
          foreignField: '_id',
          as: 'personalDetails'
        }
      },
      {
        $unwind: {
          path: '$personalDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'bankdetails',
          localField: 'personalDetails.bankDetails',
          foreignField: '_id',
          as: 'personalDetails.bankDetails'
        }
      },
      {
        $unwind: {
          path: '$personalDetails.bankDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'educationdetails',
          localField: 'personalDetails.educationalDetails',
          foreignField: '_id',
          as: 'personalDetails.educationalDetails'
        }
      },
      {
        $unwind: {
          path: '$personalDetails.educationalDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'employmentdetails',
          localField: 'employmentDetails',
          foreignField: '_id',
          as: 'employmentDetails'
        }
      },
      {
        $unwind: {
          path: '$employmentDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                _id: 1,
                roleName: 1
              }
            }
          ],
          as: 'role'
        }
      },
      {
        $unwind: {
          path: '$role',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          hash: 0,
          salt: 0
        }
      }
    ]);

    responseData.data = users;
    responseData.message = 'Users found!';
    responseData.status = SUCCESS;
    res.status(responseData.status).send(responseData);
  } catch (e) {
    responseData = {
      status: SERVER_ERROR,
      message: e,
      data: null
    };
    res.status(responseData.status).send(responseData);
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
          personalDetails: newPersonalDetails._id
        },
        { new: true }
      );
      res.status(CREATED).json({
        message: 'Personal details created successfully!',
        data: { _id: userId, personalDetailsId: newPersonalDetails._id }
      });
    } else {
      res.status(BAD_REQUEST).json({
        message: 'Failed to create the personal details.'
      });
    }
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: `Failed to create the personal details. Error message: ${error.message}`
    });
  }
};

const updatePersonalDetail = async (req, res) => {
  let status = SUCCESS;
  const responseData = {
    message: ''
  };

  const { educationalDetails, bankDetails, personalDetails } = req.body;
  const personalDetailId = personalDetails._id;
  const educationDetailId = educationalDetails._id;
  const backDetailId = bankDetails._id;

  try {
    const updatedEducationDetails = await EducationDetails.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(educationDetailId) },
      educationalDetails,
      {
        new: true
      }
    );
    const updatedBankDetails = await BankDetails.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(backDetailId) },
      bankDetails,
      { new: true }
    );
    if (updatedBankDetails !== null && updatedEducationDetails !== null) {
      const updatedPersonalDetail = await PersonalDetails.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(personalDetailId) },
        personalDetails,
        {
          new: true
        }
      );
      if (updatedPersonalDetail !== null) {
        responseData.message = 'Personal details updated successfully.';
      } else {
        status = BAD_REQUEST;
        responseData.message = 'Personal details could not be found or there must been some other issue.';
      }
    } else {
      status = BAD_REQUEST;
      responseData.message =
        'Personal details could not be updated as dependent objects (education or bank details) could not be updated.';
    }
  } catch (e) {
    responseData.message += `There was an exception. ${e.message}`;
  }
  res.status(status).send(responseData);
};

// Employment Details
const createEmploymentDetails = async (req, res) => {
  const { joiningDate, department, designation, project, employeeType, userId } = req.body;

  if (!joiningDate || !department || !designation) {
    return res.status(BAD_REQUEST).json({ message: 'Missing required fields' });
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
      return res.status(CREATED).json({
        data: { _id: userId, employmentDetailsId: newEmploymentDetails._id },
        message: 'Employment details created successfully!'
      });
    }
    return res.status(BAD_REQUEST).json({ message: 'Failed to create employment details' });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const updateEmploymentDetail = async (req, res) => {
  const employmentDetail = req.body;
  let status = SUCCESS;
  const responseData = {
    message: ''
  };

  const employmentDetailId = employmentDetail._id;

  try {
    const updatedPersonalDetail = await EmploymentDetails.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(employmentDetailId) },
      employmentDetail,
      {
        new: true
      }
    );
    if (updatedPersonalDetail !== null) {
      responseData.message = 'Employment details updated successfully. ';
    } else {
      status = BAD_REQUEST;
      responseData.message = 'Employment details could not be found or there must been some other issue.';
    }
  } catch (e) {
    responseData.message += `There was an exception. ${e.message}`;
  }
  res.status(status).send(responseData);
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
        responseData.status = NOT_FOUND;
        responseData.message += 'No such attrbute is taken into consideration for searching users.';
        break;
      }
    }
    if (users?.length === 0) {
      responseData.status = NOT_FOUND;
      responseData.message += 'No records found';
    } else {
      responseData.status = SUCCESS;
    }
    responseData.data.users = users;
  } catch (e) {
    responseData.data.message += `There was an exception : ${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

const sendPasswordResetLinkToEmail = async (req, res) => {
  const { email, hostName } = req.body;
  const responseData = {
    data: {
      passwordResetProcessResponse: null
    },
    message: '',
    status: BAD_REQUEST
  };
  try {
    const userInfo = await User.find({ email });
    if (userInfo.length === 0) {
      responseData.message = 'no user esists by such email id provided';
      responseData.passwordResetProcessResponse = null;
      responseData.status = NOT_FOUND;
    } else {
      const token = jsonwebtoken.sign(
        {
          id: userInfo[0]._id,
          email: userInfo[0].email
        },
        JWT_SECRET_KEY,
        {
          expiresIn: '1hr'
        }
      );
      const link = `${hostName}/reset-password?token=${token}`;
      const body = `<h4>Hello, ${userInfo[0].name},</h4><p>here is the <a href='${link}'>link</a> for resetting password for your account. Please visit and reset your password</p>`;
      const response = await sendEmail(userInfo[0].email, 'LMS: Reset Password', body);
      await User.findOneAndUpdate({ email }, { passwordUpdateStatus: 1 }, { new: true });
      responseData.data.passwordResetProcessResponse = response.data;
      responseData.message = response.message;
      responseData.status = SUCCESS;
    }
  } catch (e) {
    responseData.data.passwordResetProcessResponse = null;
    responseData.status = SERVER_ERROR;
    responseData.message = `${e.message} There was an issue while sending email for password reset link to email`;
  }
  res.status(responseData.status).send(responseData);
};

const resetPassword = async (req, res) => {
  const responseData = {
    data: {
      passwordResetProcessResponse: null
    },
    message: '',
    status: BAD_REQUEST
  };
  try {
    const { password, emailId } = req.body;
    const uniqueSalt = crypto.randomBytes(RANDOM_BYTES_CHARACTERS).toString('hex');
    const hash = generateHash(password, uniqueSalt);
    const userWithPasswordUpdated = await User.findOneAndUpdate(
      { email: emailId },
      {
        hash,
        salt: uniqueSalt,
        passwordUpdateStatus: 0
      },
      {
        new: true
      }
    );
    if (userWithPasswordUpdated !== null) {
      responseData.data.passwordResetProcessResponse = userWithPasswordUpdated;
      responseData.message = 'Password has been reset!';
      responseData.status = SUCCESS;
    } else {
      responseData.data = null;
      responseData.message = 'There was an issue while resetting your password. Contact admin please.';
      responseData.status = BAD_REQUEST;
    }
  } catch (e) {
    responseData.data = null;
    responseData.message = `There was an issue while resetting your password. ${e.message}`;
    responseData.status = SERVER_ERROR;
  }
  res.status(responseData.status).send(responseData);
};

const getPasswordUpdateStatus = async (req, res) => {
  const responseData = {
    data: null,
    message: '',
    status: BAD_REQUEST
  };
  const { email } = req.body;
  try {
    const passwordUpdateStatus = await User.find({ email }, { passwordUpdateStatus: 1 });
    if (passwordUpdateStatus !== null) {
      [responseData.data] = passwordUpdateStatus;
      responseData.message = 'Password update status found ';
      responseData.status = SUCCESS;
    } else {
      responseData.data = null;
      responseData.message = 'no data found';
      responseData.status = BAD_REQUEST;
    }
  } catch (e) {
    responseData.data = null;
    responseData.message = `There was an issue. ${e.message}`;
    responseData.status = SERVER_ERROR;
  }
  res.status(responseData.status).send(responseData);
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
  getUsersBasedOnCondition,
  deleteUser,
  updatePersonalDetail,
  updateEmploymentDetail,
  sendPasswordResetLinkToEmail,
  resetPassword,
  getPasswordUpdateStatus
};
