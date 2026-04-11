import { config } from 'dotenv';
import express from 'express';
import dbConnect from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
config();
dbConnect();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get('/',(req,res)=>{
    res.send("api working fine");
})


app.use('/api/v1/auth', authRouter)

app.listen(PORT,()=>{
    console.log("server running at:",PORT);
})

