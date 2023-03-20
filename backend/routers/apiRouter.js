import express from 'express'
import sendDummyJson from '../services/mockService.js';
import userRouter from './userRouter.js';

const apiRouter = express.Router();

apiRouter.get('/', sendDummyJson);
apiRouter.use('/user', userRouter);
export default apiRouter;
