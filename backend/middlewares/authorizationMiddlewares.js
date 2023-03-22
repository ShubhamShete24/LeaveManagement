import Role from "../models/role.js";
import User from "../models/user.js";
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv';
import roles from "../constants/roles.js";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

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
    jsonwebtoken.verify(authToken, JWT_SECRET_KEY, (err, data) => {
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

const verifyAdmin = async (req, res, next) => {
    const responseData = {
        status: 0,
        message: "",
        data: null
    }
    const role = await Role.find({ 'roleName': roles.ADMIN })
    if (role.length == 0) {
        next();
    }
    else {
        const adminUser = await User.find({ 'role': role[0]._id })
        if (adminUser.length!=0) {
            const bearerToken = req.headers['authorization']
            if (typeof bearerToken == 'undefined') 
            {
                responseData.status = 401;
                responseData.message = "Auth token is required to access resources";
                res.send(responseData);
            } 
            else 
            {
                const authToken = bearerToken.split(' ')[1]
                jsonwebtoken.verify(authToken, JWT_SECRET_KEY, (err, data) => {
                    if (err) 
                    {
                        responseData.status = 401;
                        responseData.message = "Invalid auth token";
                        res.send(responseData);
                    } 
                    else 
                    {
                        if(data.userInfo.role.length == 0)
                        {
                            responseData.status = 400;
                            responseData.message = "No role has been assigned yet. Contact admin."
                            res.send(responseData);
                            // Here return could be necessary as to stop further propogation of code.
                            return;
                        }
                        if (data.userInfo.role[0]._id === role[0]._id.toString()) 
                        {
                            next()
                        } 
                        else 
                        {
                            responseData.status = 401;
                            responseData.message = "You need admin rights to create role. You are not an admin user"
                            res.send(responseData);
                        }
                    }
                })
            }
        }
        else 
        {
            next();
        }
    }

}

export { verifyToken, verifyAdmin }