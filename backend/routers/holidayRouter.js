import express from 'express';
import { verifyAdmin } from '../middlewares/authorizationMiddlewares.js';
import { createHoliday, deleteHoliday, getHolidays, updateHoliday } from '../services/holidayService.js';

const holidayRouter = express.Router();

holidayRouter.post('/create-holiday', createHoliday);
holidayRouter.put('/update-holiday', verifyAdmin, updateHoliday);
holidayRouter.delete('/delete-holiday', verifyAdmin, deleteHoliday);
holidayRouter.get('/get-all-holidays', getHolidays);

export default holidayRouter;
