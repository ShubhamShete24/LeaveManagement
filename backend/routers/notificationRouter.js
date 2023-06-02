import express from 'express';
import { notifyByEmail } from '../services/notificationlService.js';

const notificationRouter = express.Router();
notificationRouter.post('/send-email', notifyByEmail);
export default notificationRouter;
