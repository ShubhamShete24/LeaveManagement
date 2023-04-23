import express from 'express';
import { verifyAdmin, verifyToken } from '../middlewares/authorizationMiddlewares.js';
import { createHoliday, deleteHoliday, getHolidays, updateHoliday } from '../services/holidayService.js';

const holidayRouter = express.Router();

holidayRouter.post('/create-holiday', verifyAdmin, createHoliday);
holidayRouter.put('/update-holiday', verifyAdmin, updateHoliday);
holidayRouter.delete('/delete-holiday', verifyAdmin, deleteHoliday);
holidayRouter.get('/get-all-holidays', verifyToken, getHolidays);

export default holidayRouter;
