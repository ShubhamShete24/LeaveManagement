import express from 'express'
import cors from 'cors'
import path from 'path';
import apiRouter from './routers/apiRouter.js';

var app = express();
const __dirName = path.resolve();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

const PORT = 8000

app.listen(PORT, ()=>{
    console.log(`server has started on port ${PORT}`);
})

