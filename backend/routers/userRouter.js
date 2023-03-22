import express from 'express';
import { verifyAdmin, verifyToken } from '../middlewares/authorizationMiddlewares.js';
import {createUser,authenticate, updateUserInfo, assignRole, assignManager, getUsers} from './../services/userService.js';
const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.post("/authenticate", authenticate);
userRouter.put("/update-user-info", verifyToken, updateUserInfo);
userRouter.post("/assign-role", verifyAdmin, assignRole);
userRouter.post("/assign-manager", verifyAdmin, assignManager);
userRouter.get("/get-users", verifyAdmin, getUsers);

export default userRouter;