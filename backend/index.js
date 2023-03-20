import express from 'express'
import cors from 'cors'
import path from 'path';
import apiRouter from './routers/apiRouter.js';
import connectDB from './config/db.js';

var app = express();
//const __dirName = path.resolve();
connectDB("mongodb+srv://admin10:lms-admin10@cluster0.wfnyrqq.mongodb.net/?retryWrites=true&w=majority")
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

// This set up is only when you want 
// app.use("/", express.static(path.join(__dirName, "/backend/build" )));
// app.all("*", (req, resp)=>{
//     resp.sendFile(path.join(__dirName , "/backend/build/index.html"));
// });

const PORT = 8000

app.listen(PORT, ()=>{
    console.log(`server has started on port ${PORT}`);
})

