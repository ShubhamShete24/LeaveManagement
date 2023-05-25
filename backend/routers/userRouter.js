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
  createEmploymentDetails,
  getUsersBasedOnCondition,
  deleteUser,
  updatePersonalDetail,
  updateEmploymentDetail
} from '../services/userService.js';

const userRouter = express.Router();

userRouter.post('/authenticate', authenticate);
userRouter.put('/update-user-info', verifyToken, updateUserInfo);
userRouter.post('/assign-role', verifyAdmin, assignRole);
userRouter.post('/assign-manager', verifyAdmin, assignManager);
userRouter.get('/get-users', verifyAdmin, getUsers);
userRouter.post('/get-users-based-on-condition', getUsersBasedOnCondition);
userRouter.post('/create-user', verifyAdmin, createUser);
userRouter.post('/create-personalDetails', verifyAdmin, createPersonalDetails);
userRouter.post('/create-employmentDetails', verifyAdmin, createEmploymentDetails);
userRouter.put('/update-personalDetails', verifyAdmin, updatePersonalDetail);
userRouter.put('/update-employmentDetails', verifyAdmin, updateEmploymentDetail);
userRouter.delete('/delete-user', verifyAdmin, deleteUser);

export default userRouter;
