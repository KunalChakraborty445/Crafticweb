import { config } from 'dotenv';
import express from 'express';
import dbConnect from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import websiteRouter from './routes/website.routes.js';
import billingRouter from './routes/billing.route.js';
import { stripeWebhookController } from './controllers/stripeWebhook.controller.js';
config();


const app = express();
app.post('/api/v1/stripe/webhook',express.raw({type: 'application/json'}), stripeWebhookController)
dbConnect();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://crafticwebai-beta.onrender.com",
       credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
    next()
})

app.get('/',(req,res)=>{
    res.send("api working fine");
})



app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/website', websiteRouter)
app.use('/api/v1/billing', billingRouter)

app.listen(PORT,()=>{
    console.log("server running at:",PORT);
})

