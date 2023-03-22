import express from 'express';
import { verifyAdmin } from '../middlewares/authorizationMiddlewares.js';
import { createRole, deleteRole, getRoles, updateRole } from '../services/roleService.js';

const roleRouter = express.Router();
roleRouter.post('/create-role', verifyAdmin, createRole);
roleRouter.put('/update-role', verifyAdmin, updateRole);
roleRouter.delete('/delete-role',verifyAdmin,  deleteRole);
roleRouter.get('/get-roles', verifyAdmin, getRoles);


export default roleRouter;