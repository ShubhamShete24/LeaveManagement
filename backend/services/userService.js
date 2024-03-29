import User from './../models/user.js';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken'
import mongoose from 'mongoose'

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const createUser = async (req, res) => {
    let user = req.body;
    const responseData = {
        status: 0,
        data: null,
        message: ""
    }
    try {

        if (!user.password || !user.email || !user.name) {
            responseData.status = 400,
                responseData.message = "Required attributes not suppied."
            res.send(responseData)
        }
        const uniqueSalt = crypto.randomBytes(16).toString('hex');
        const hash = generateHash(user.password, uniqueSalt)
        delete user.password;
        user = { ...user, salt: uniqueSalt };
        user = { ...user, hash: hash };

        const userCreated = await User.create(user);
        if (userCreated) {
            responseData.status = 201,
                responseData.message = "User has been created."
            responseData.data = userCreated;
        } else {
            res.send(responseData);
        }
    } catch (err) {
        responseData.status = 500;
        responseData.message = err.message;
    }
    res.send(responseData);
}
const authenticate = async (req, res) => {

    const responseData = {
        status: 0,
        message: "",
        data: {
            user: null,
            authToken: ""
        }
    }
    const {
        email, password
    } = req.body;
    let user = await User.aggregate(
        [{
            $match: {
                email: email
            }
        },
        {
            $lookup: {
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "role"
            }
        }]
    )
    if (user) {
        if (verifyHash(user[0].hash, user[0].salt, password)) {
            responseData.message = "User found";
            responseData.status = 200;
            const token = jsonwebtoken.sign({ userInfo: user[0] }, JWT_SECRET_KEY, { expiresIn: process.env.JWT_SESSION_TIMEOUT })
            responseData.data.user = user
            responseData.data.authToken = token
        } else {
            responseData.message = "Invalid password";
            responseData.status = 401;
        }
    } else {
        responseData.message = "User not found";
        responseData.status = 400;
    }
    return res.send(responseData);

}
const generateHash = (plainText, salt) => {
    return crypto.pbkdf2Sync(plainText, salt, 1000, 64, 'sha512').toString('hex');
}
const verifyHash = (hash, salt, plainText) => {
    return crypto.pbkdf2Sync(plainText, salt, 1000, 64, 'sha512').toString('hex') == hash;
}

const updateUserInfo = async (req, res) => {
    let userInfo = req.body.userInfo;
    delete userInfo.role;
    const responseData = {
        status: 0,
        message: "",
        data: null
    }
    const updatePassword = req.body.updatePassword;
    if (!updatePassword) {
        // logic for regenrating the hash
        delete userInfo.password
    } else {
        const uniqueSalt = crypto.randomBytes(16).toString('hex');
        const hash = generateHash(userInfo.password, uniqueSalt);
        userInfo = { ...userInfo, hash: hash }
        userInfo = { ...userInfo, salt: uniqueSalt }
        delete userInfo.password
    }

    const updatedUser = await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userInfo.id) }, userInfo, { new: true })
    responseData.status = 200;
    responseData.message = "User details updated successfully."
    responseData.data = updatedUser;
    res.send(responseData);
}

// follow single responsibility 
const assignRole = async (req, res) => {
    const responseData = {
        status: 0,
        message: "",
        data: null
    }
    try {
        const { userId, roleId } = req.body;
        const updatedUser = await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, { role: new mongoose.Types.ObjectId(roleId) }, { new: true })
        if (updatedUser == null) {
            responseData.status = 404;
            responseData.message = 'User not found';
        } else {
            responseData.data = {
                roleUpdatedTo: updatedUser?.role
            }
            responseData.status = 200;
            responseData.message = 'Role updated';
        }
    } catch (e) {
        responseData.status = 406;
        responseData.message = 'The request could not be completed :' + e.message;
    }
    res.send(responseData);
}

const assignManager = async (req, res) => {
    const responseData = {
        status: 0,
        message: "",
        data: null
    }
    const { userId, managerId } = req.body;
    try {
        console.log( userId, managerId )
        const updatedUser = await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, { "reportingManager": new mongoose.Types.ObjectId(managerId) }, { new: true });
        if (updatedUser == null) {
            responseData.status = 404;
            responseData.message = 'User not found';
        } else {
            responseData.data = {
                managerIdAssigned: updatedUser?.reportingManager
            }
            responseData.status = 200;
            responseData.message = 'Manager assigned';
        }
    } catch (e) {
        responseData.status = 500;
        responseData.message = 'Manager assignment failed! ' + e.message;
    }
    res.send(responseData);
}
const getUsers = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'reportingManager',
                    foreignField: '_id',
                    pipeline: [{
                        $project:{
                            _id:1,
                            name:1
                        }
                    }],
                    as: 'reportingManager'
                }
            }
        ])
        const responseData = {
            status: 0,
            message: "",
            data: null
        }
        responseData.data = users;
        responseData.message= "Users found!";
        responseData.status = 200;
        res.send(responseData)
    } catch (e) {

    }
}
export { createUser, authenticate, updateUserInfo, assignRole, assignManager, getUsers };