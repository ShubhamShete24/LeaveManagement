import express from 'express';
import sendDummyJson from '../services/mockService.js';
import leavesRouter from './leavesRouter.js';
import roleRouter from './roleRouter.js';
import userRouter from './userRouter.js';
import holidayRouter from './holidayRouter.js';
import notificationRouter from './notificationRouter.js';

const apiRouter = express.Router();

apiRouter.get('/', sendDummyJson);
apiRouter.use('/user', userRouter);
apiRouter.use('/role', roleRouter);
apiRouter.use('/leaves', leavesRouter);
apiRouter.use('/holiday', holidayRouter);
apiRouter.use('/notify', notificationRouter);

export default apiRouter;
