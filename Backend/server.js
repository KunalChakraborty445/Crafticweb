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
// Trusted frontend origins. Add your deployed frontend host here as a fallback
const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "https://crafticwebai-beta.onrender.com"
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// NOTE: Removed global Cross-Origin-Opener-Policy header because it
// interferes with popup/window close behavior for third-party auth/checkout flows.

app.get('/',(req,res)=>{
    res.send("api working fine");
})

// Debug route: returns the Origin header and request headers for troubleshooting CORS
app.get('/api/v1/debug/origin', (req, res) => {
    return res.json({ originHeader: req.get('origin') || null, headers: req.headers });
});



app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/website', websiteRouter)
app.use('/api/v1/billing', billingRouter)

app.listen(PORT,()=>{
    console.log("server running at:",PORT);
})

