import mongoose from 'mongoose';
import Role from '../models/role.js';

const createRole = async (req, res) => {
  const responseData = {
    status: 0,
    message: '',
    data: null
  };
  const role = req.body;
  try {
    const newRole = await Role.create(role);
    if (newRole != null) {
      responseData.status = 201;
      responseData.message = 'Role created successfully!';
      responseData.data = newRole;
    } else {
      responseData.status = 500;
      responseData.message = 'There is some problem while creating the role.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.message = `There is some problem while creating the role.${e.message}`;
  }
  res.send(responseData);
};

const updateRole = async (req, res) => {
  const responseData = {
    status: 0,
    message: '',
    data: null
  };
  const role = req.body;
  try {
    const updatedRole = await Role.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(role.id) }, role, { new: true });
    if (updatedRole != null) {
      responseData.status = 200;
      responseData.message = 'Role updated successfully!';
      responseData.data = updatedRole;
    } else {
      responseData.status = 500;
      responseData.message = 'There is some problem while updating the role.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.message = `There is some problem while updating the role.${e.message}`;
  }
  res.send(responseData);
};

const deleteRole = async (req, res) => {
  const responseData = {
    status: 0,
    message: '',
    data: null
  };
  const role = req.body;
  try {
    const updatedRole = await Role.findOneAndDelete({ _id: new mongoose.Types.ObjectId(role.id) });
    if (updatedRole != null) {
      responseData.status = 200;
      responseData.message = 'Role deleted successfully!';
      responseData.data = updatedRole;
    } else {
      responseData.status = 404;
      responseData.message =
        'There is some problem while deleting the role. Most probably role with the given ID does not exists.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.message = `There is some problem while deleting the role.${e.message}`;
  }
  res.send(responseData);
};

const getRoles = async (req, res) => {
  const responseData = {
    status: 0,
    message: '',
    data: null
  };
  //   const role = req.body;
  try {
    const roles = await Role.find();
    if (roles.length !== 0) {
      responseData.status = 200;
      responseData.message = 'Roles found!';
      responseData.data = roles;
    } else {
      responseData.status = 404;
      responseData.message = 'No roles found.';
    }
  } catch (e) {
    responseData.status = 500;
    responseData.message = `There is some problem while deleting the role.${e.message}`;
  }
  res.send(responseData);
};

export { createRole, updateRole, deleteRole, getRoles };
