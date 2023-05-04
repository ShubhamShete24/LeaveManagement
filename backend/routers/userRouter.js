import express from 'express';
import { verifyAdmin, verifyToken } from '../middlewares/authorizationMiddlewares.js';
import {
  createUser,
  authenticate,
  updateUserInfo,
  assignRole,
  assignManager,
  getUsers,
  createPersonalDetails,
  createEmployeeDetails
} from '../services/userService.js';

const userRouter = express.Router();

userRouter.post('/create-user', createUser);
userRouter.post('/authenticate', authenticate);
userRouter.put('/update-user-info', verifyToken, updateUserInfo);
userRouter.post('/assign-role', verifyAdmin, assignRole);
userRouter.post('/assign-manager', verifyAdmin, assignManager);
userRouter.get('/get-users', verifyAdmin, getUsers);
userRouter.post('/create-personalDetails', createPersonalDetails);
userRouter.post('/create-employeeDetails', createEmployeeDetails);

export default userRouter;
