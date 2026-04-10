import { config } from 'dotenv';
import express from 'express';
import dbConnect from './config/db.js';


const app = express();
config();
dbConnect();
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("api working fine");
})

app.listen(PORT,()=>{
    console.log("server running at:",PORT);
})

