import mongoose from 'mongoose';
import Holiday from '../models/holiday.js';

const createHoliday = async (req, res) => {
  const responseData = {
    status: 0,
    data: {
      message: '',
      createdHoliday: null
    }
  };
  const holiday = req.body;
  try {
    const newHoliday = await Holiday.create(holiday);
    if (newHoliday != null) {
      responseData.status = 201;
      responseData.data.message = 'Leave type created successfully!';
      responseData.data.createdHoliday = newHoliday;
    } else {
      responseData.status = 500;
      responseData.data.message = 'There is some problem while creating the holiday.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.data.message = `There is some problem while creating the holiday.${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

const updateHoliday = async (req, res) => {
  const responseData = {
    status: 0,
    data: {
      message: '',
      updatedHoliday: null
    }
  };
  const holiday = req.body;
  if (!holiday.id) {
    responseData.data.message = 'Leave type id is required';
    responseData.status = 406;
    res.status(responseData.status).send(responseData.data);
    return;
  }
  try {
    const updatedHoliday = await Holiday.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(holiday.id) }, holiday, {
      new: true
    });
    if (updatedHoliday != null) {
      responseData.status = 200;
      responseData.data.message = 'Leave type updated successfully!';
      responseData.data.updatedHoliday = updatedHoliday;
    } else {
      responseData.status = 500;
      responseData.data.message = 'There is some problem while updating the holiday.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.data.message = `There is some problem while updating the holiday.${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

const deleteHoliday = async (req, res) => {
  const responseData = {
    status: 0,
    data: {
      deletedHoliday: null,
      message: ''
    }
  };
  const holiday = req.body;
  try {
    const deletedHoliday = await Holiday.findOneAndDelete({ _id: new mongoose.Types.ObjectId(holiday.id) });
    if (deletedHoliday != null) {
      responseData.status = 200;
      responseData.data.message = 'Leave type deleted successfully!';
      responseData.data.deletedHoliday = deletedHoliday;
    } else {
      responseData.status = 404;
      responseData.data.message =
        'There is some problem while deleting the holiday. Most probably Holiday with the given ID does not exists.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.data.message = `There is some problem while deleting the holiday.${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

const getHolidays = async (req, res) => {
  const responseData = {
    status: 0,
    data: {
      message: '',
      holidays: null
    }
  };
  try {
    const holidays = await Holiday.find();
    if (holidays.length !== 0) {
      responseData.status = 200;
      responseData.data.message = 'Holidays found!';
      responseData.data.holidays = holidays;
    } else {
      responseData.status = 404;
      responseData.data.message = 'No holidays found.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.data.message = `There is some problem while deleting the holiday.${e.message}`;
  }
  res.status(responseData.status).send(responseData.data);
};

export { createHoliday, updateHoliday, deleteHoliday, getHolidays };
