import express from 'express';
import {createUser,authenticate, verifyToken, updateUserInfo, assignRole} from './../services/userService.js';
const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.post("/authenticate", authenticate);
userRouter.put("/update-user-info", verifyToken, updateUserInfo);
userRouter.post("/assign-role", verifyToken, assignRole);

export default userRouter;