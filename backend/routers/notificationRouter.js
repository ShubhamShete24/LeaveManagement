import express from 'express';
import sendEmail from '../services/notificationlService.js';

const notificationRouter = express.Router();
notificationRouter.post('/send-email', sendEmail);
export default notificationRouter;
