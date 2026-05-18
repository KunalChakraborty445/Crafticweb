import { config } from 'dotenv';
config();
import express from 'express';
import dbConnect from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import websiteRouter from './routes/website.routes.js';
import billingRouter from './routes/billing.route.js';
import { stripeWebhookController } from './controllers/stripeWebhook.controller.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));

app.post('/api/v1/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhookController);

app.use(express.json());
app.use(cookieParser());


dbConnect();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("api working fine");
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/website', websiteRouter);
app.use('/api/v1/billing', billingRouter);

app.listen(PORT, () => {
    console.log("server running at:", PORT);
});