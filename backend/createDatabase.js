import connectDB from "./config/db.js";
import express from 'express';
import dotenv from 'dotenv';
import fetch from "node-fetch";
import apiRouter from "./routers/apiRouter.js";

var dbCreator = express();
// dotenv.config();
dotenv.config()
await connectDB(process.env.DB_URL, process.env.DB_NAME);
dbCreator.use(express.json())
dbCreator.listen(process.env.PORT, ()=>{
    console.log("server started on port ", process.env.PORT);
});
dbCreator.use("/api", apiRouter);

let data = {
    roleName: "ADMIN"
}
let options = {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(data)
}

const adminRole = await fetch('http://localhost:8000/api/role/create-role', options).then(response => response.json());
console.log("[*] ADMIN role created");

// create admin user
data = {
    email: 'johndoe@gmail.com',
    password : 'John@123',
    name: 'John Doe'
}
options.body = JSON.stringify(data);
const adminUser = await fetch('http://localhost:8000/api/user/create-user', options).then(response =>response.json())
console.log("[*] New user created");

data = {
    roleId: adminRole.data._id,
    userId : adminUser.data._id
}
options.body = JSON.stringify(data);
const roleAssigned =  await fetch("http://localhost:8000/api/user/assign-role", options).then(response =>response.json());

console.log("[*] Admin user set");
