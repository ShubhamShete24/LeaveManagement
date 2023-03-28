import express from 'express';
import { verifyAdmin } from '../middlewares/authorizationMiddlewares.js';
import { createLeaveType, deleteLeaveType, getLeaveTypes, updateLeaveType } from '../services/leaveTypeService.js';
const leavesRouter = express.Router();

leavesRouter.post('/create-leave-type', verifyAdmin, createLeaveType);
leavesRouter.put('/update-leave-type',verifyAdmin, updateLeaveType);
leavesRouter.delete('/delete-leave-type',verifyAdmin, deleteLeaveType);
leavesRouter.get('/get-leave-types', verifyAdmin, getLeaveTypes);

export default leavesRouter;