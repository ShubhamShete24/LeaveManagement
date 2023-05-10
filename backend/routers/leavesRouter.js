import express from 'express';
import { verifyAdmin, verifyToken } from '../middlewares/authorizationMiddlewares.js';
import {
  createLeaveType,
  deleteLeaveType,
  getLeaveTypes,
  updateLeaveType,
  applyForLeaves,
  getAppliedLeaves,
  updateLeaveApplication,
  getLeaveBalances
} from '../services/leavesService.js';

const leavesRouter = express.Router();

leavesRouter.post('/create-leave-type', verifyAdmin, createLeaveType);
leavesRouter.put('/update-leave-type', verifyAdmin, updateLeaveType);
leavesRouter.delete('/delete-leave-type', verifyAdmin, deleteLeaveType);
leavesRouter.get('/get-leave-types', verifyToken, getLeaveTypes);
leavesRouter.post('/apply-for-leaves', verifyToken, applyForLeaves);
leavesRouter.get('/get-applied-leaves', verifyToken, getAppliedLeaves);
leavesRouter.put('/update-leave-application', verifyToken, updateLeaveApplication);
leavesRouter.get('/get-leave-balances', getLeaveBalances);
export default leavesRouter;
