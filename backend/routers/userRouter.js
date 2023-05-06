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
  createEmploymentDetails
} from '../services/userService.js';

const userRouter = express.Router();

userRouter.post('/authenticate', authenticate);
userRouter.put('/update-user-info', verifyToken, updateUserInfo);
userRouter.post('/assign-role', verifyAdmin, assignRole);
userRouter.post('/assign-manager', verifyAdmin, assignManager);
userRouter.get('/get-users', getUsers);
userRouter.post('/create-user', verifyAdmin, createUser);
userRouter.post('/create-personalDetails', verifyAdmin, createPersonalDetails);
userRouter.post('/create-employmentDetails', verifyAdmin, createEmploymentDetails);

export default userRouter;
