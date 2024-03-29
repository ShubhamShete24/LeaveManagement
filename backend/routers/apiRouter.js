import express from 'express'
import sendDummyJson from '../services/mockService.js';
import roleRouter from './roleRouter.js';
import userRouter from './userRouter.js';

const apiRouter = express.Router();

apiRouter.get('/', sendDummyJson);
apiRouter.use('/user', userRouter);
apiRouter.use('/role', roleRouter);
export default apiRouter;
