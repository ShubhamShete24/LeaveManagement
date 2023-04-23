import mongoose from 'mongoose';
import LeaveType from '../models/leaveType.js';
import LeaveApplication from '../models/leaveApplication.js';

const createLeaveType = async (req, res) => {
  const responseData = {
    status: 0,
    data: {
      message: '',
      createdLeaveType: null
    }
  };
  const leaveType = req.body;
  try {
    const newLeaveType = await LeaveType.create(leaveType);
    if (newLeaveType != null) {
      responseData.status = 201;
      responseData.data.message = 'Leave type created successfully!';
      responseData.data.createdLeaveType = newLeaveType;
    } else {
      responseData.status = 500;
      responseData.data.message = 'There is some problem while creating the leave type.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.data.message = `There is some problem while creating the leave type.${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

const updateLeaveType = async (req, res) => {
  const responseData = {
    status: 0,
    data: {
      message: '',
      updatedLeaveType: null
    }
  };
  const leaveType = req.body;
  if (!leaveType.id) {
    responseData.data.message = 'Leave type id is required';
    responseData.status = 406;
    res.send(responseData);
    return;
  }
  try {
    const updatedLeaveType = await LeaveType.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(leaveType.id) },
      leaveType,
      { new: true }
    );
    if (updatedLeaveType != null) {
      responseData.status = 200;
      responseData.data.message = 'Leave type updated successfully!';
      responseData.data.updatedLeaveType = updatedLeaveType;
    } else {
      responseData.status = 500;
      responseData.data.message = 'There is some problem while updating the leave type.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.data.message = `There is some problem while updating the leave type.${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

const deleteLeaveType = async (req, res) => {
  const responseData = {
    status: 0,
    message: '',
    data: null
  };
  const leaveType = req.body;
  try {
    const updatedLeaveType = await LeaveType.findOneAndDelete({ _id: new mongoose.Types.ObjectId(leaveType.id) });
    if (updatedLeaveType != null) {
      responseData.status = 200;
      responseData.data.message = 'Leave type deleted successfully!';
      responseData.data = updatedLeaveType;
    } else {
      responseData.status = 404;
      responseData.data.message =
        'There is some problem while deleting the leave type. Most probably LeaveType with the given ID does not exists.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.data.message = `There is some problem while deleting the leave type.${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

const getLeaveTypes = async (req, res) => {
  const responseData = {
    status: 0,
    data: {
      leaveTypes: null,
      message: ''
    }
  };
  try {
    const leaveTypes = await LeaveType.find();
    if (leaveTypes.length !== 0) {
      responseData.status = 200;
      responseData.data.message = 'Leave types found!';
      responseData.data.leaveTypes = leaveTypes;
    } else {
      responseData.status = 404;
      responseData.data.message = 'No Leave types found.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.data.message = `There is some problem while deleting the leave type.${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

const applyForLeaves = async (req, res) => {
  const responseData = {
    status: 0,
    data: {
      leavesApplied: null,
      message: ''
    }
  };
  const leaveApplication = req.body;
  try {
    const newLeaveApplication = await LeaveApplication.create(leaveApplication);
    if (newLeaveApplication != null) {
      responseData.status = 201;
      responseData.data.message = 'leaveApplication created successfully!';
      responseData.data.leavesApplied = newLeaveApplication;
    } else {
      responseData.status = 500;
      responseData.data.message = 'There is some problem while creating the leave type.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.data.message = `There is some problem while creating the leave type.${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

export { createLeaveType, updateLeaveType, deleteLeaveType, getLeaveTypes, applyForLeaves };
