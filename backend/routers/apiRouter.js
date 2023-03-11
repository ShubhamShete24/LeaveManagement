import express from 'express'
import sendDummyJson from '../services/mockService.js';

const apiRouter = express.Router();

apiRouter.get('/', sendDummyJson);

export default apiRouter;
