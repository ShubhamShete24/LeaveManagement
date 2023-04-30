import express from 'express';
import { verifyAdmin, verifyToken } from '../middlewares/authorizationMiddlewares.js';
import {
  createLeaveType,
  deleteLeaveType,
  getLeaveTypes,
  updateLeaveType,
  applyForLeaves,
  getAppliedLeaves,
  updateLeaveApplication
} from '../services/leavesService.js';

const leavesRouter = express.Router();

leavesRouter.post('/create-leave-type', verifyAdmin, createLeaveType);
leavesRouter.put('/update-leave-type', verifyAdmin, updateLeaveType);
leavesRouter.delete('/delete-leave-type', verifyAdmin, deleteLeaveType);
leavesRouter.get('/get-leave-types', verifyToken, getLeaveTypes);
leavesRouter.post('/apply-for-leaves', verifyToken, applyForLeaves);
leavesRouter.get('/get-applied-leaves', verifyToken, getAppliedLeaves);
leavesRouter.put('/update-leave-application', verifyToken, updateLeaveApplication);
export default leavesRouter;
