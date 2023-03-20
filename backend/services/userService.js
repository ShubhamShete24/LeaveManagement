import User from './../models/user.js';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken'
import mongoose from 'mongoose'
import roles from '../constants/roles.js';
const createUser = async (req, res) => {
    const responseData = {
        status: 0,
        data: null,
        message: ""
    }
    try {

        let user = req.body;
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
        user = { ...user, role: roles.EMPLOYEE };

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
    let user = await User.findOne({ "email": email });
    if (user) {
        if (verifyHash(user.hash, user.salt, password)) {
            responseData.message = "User found";
            responseData.status = 200;
            const token = jsonwebtoken.sign({ userInfo: user }, "secretkey", { expiresIn: '1hr' })
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
const verifyToken = (req, res, next) => {
    const responseData = {
        status: 0,
        message: "",
        data: null
    }
    const bearerToken = req.headers['authorization']
    if (typeof bearerToken == 'undefined') {
        responseData.status = 401;
        responseData.message = "Auth token is required to access resources";
        res.send(responseData);
    }
    const authToken = bearerToken.split(" ")[1]
    jsonwebtoken.verify(authToken, "secretkey", (err, data) => {
        if (err) {
            responseData.status = 401;
            responseData.message = "Invalid auth token";
            res.send(responseData);
        } else {
            data = { ...data, jwtVerified: true }
            next()
        }
    })
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
const assignRole = async (req, res) => {
    const responseData = {
        status: 0,
        message: "",
        data: null
    }
    const { userId, role } = req.body;
    const bearer = req.headers['authorization'];
    if (typeof bearer == 'undefined') {
        responseData.status = 401;
        responseData.message = "Auth token is required to access resources";
        res.send(responseData);
    }
    const bearerToken = bearer.split(" ")[1];
    jsonwebtoken.verify(bearerToken, "secretkey", async (err, data) => {
        if (err) {
            responseData.message = err.message;
            responseData.status = 500;
            res.send(responseData);
        } else {
            // admin role
            if (data.userInfo.role === roles.ADMIN) {
                const updatedUser = await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, { role: role }, {new : true})
                console.log(updatedUser);
                responseData.data = {
                    roleUpdatedTo : updatedUser?.role
                }
                responseData.status = 200;
                responseData.message = 'Role updated';
                res.send(responseData);
            }
            else {
                responseData.status = 401;
                responseData.message = "You do not have the right to update role!"
                res.send(responseData);
            }
        }
    })

}
export { createUser, authenticate, verifyToken, updateUserInfo, assignRole };