import connectDB from "./config/db.js";
import express, { response } from 'express';
import dotenv from 'dotenv';
import fetch from "node-fetch";
import apiRouter from "./routers/apiRouter.js";

const ADMIN_EMAIL = "john.doe@gmail.com"
const ADMIN_NAME = "John Doe"
const ADMIN_PASSWORD = "John@123"

var dbCreator = express();
// dotenv.config();
dotenv.config()
await connectDB(process.env.DB_URL, process.env.DB_NAME);
dbCreator.use(express.json())
dbCreator.listen(process.env.PORT, ()=>{
    console.log("server started on port ", process.env.PORT);
});
dbCreator.use("/api", apiRouter);
let options = {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    }
}

options.body = JSON.stringify({
    leaveType : 'Annual',
    leavesAllowed : 18
})
const annualLeave = await fetch("http://localhost:8000/api/leaves/create-leave-type", options).then(response => response.json());
if(annualLeave.status == 201){
    console.log("[*] Leave type created - Annual leave");
}

options.body = JSON.stringify({
    leaveType : 'Casual',
    leavesAllowed : 8
})
const casualLeave= await fetch("http://localhost:8000/api/leaves/create-leave-type", options).then(response => response.json());
if(casualLeave.status == 201){
    console.log("[*] Leave type created - Casual leave");
}


options.body = JSON.stringify({
    leaveType : 'Paternity',
    leavesAllowed : 5
})
const paternityLeave = await fetch("http://localhost:8000/api/leaves/create-leave-type", options).then(response => response.json());
if(paternityLeave.status == 201){
    console.log("[*] Leave type created - Paternity leave");
}

let data = {
    roleName: "ADMIN"
}

options. body =JSON.stringify(data)


const adminRole = await fetch('http://localhost:8000/api/role/create-role', options).then(response => response.json());
if(adminRole.status == 201){
    console.log("[*] ADMIN role created");
}

options.body = JSON.stringify({
    roleName:  "EMPLOYEE"
})
const employeeRole = await fetch('http://localhost:8000/api/role/create-role', options).then(response => response.json());
if(employeeRole.status == 201 ){
    console.log("[*] EMPLOYEE role created");
}
// create admin user
data = {
    email: ADMIN_EMAIL,
    password : ADMIN_PASSWORD,
    name: ADMIN_NAME
}
options.body = JSON.stringify(data);
const adminUser = await fetch('http://localhost:8000/api/user/create-user', options).then(response =>response.json())
if(adminUser.status == 201){
    console.log("[*] New user created");
}

data = {
    roleId: adminRole.data._id,
    userId : adminUser.data._id
}
options.body = JSON.stringify(data);
const roleAssigned =  await fetch("http://localhost:8000/api/user/assign-role", options).then(response =>response.json());
console.log()
if(roleAssigned.status == 200){
    console.log("[*] Admin user set");
}



