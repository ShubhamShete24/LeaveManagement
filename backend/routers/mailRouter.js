import express from 'express';
import sendEmail from '../services/mailService.js';

const mailRouter = express.Router();
mailRouter.post('/send-email', sendEmail);
export default mailRouter;
