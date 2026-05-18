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

// ✅ Support multiple frontend origins
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://crafticwebai-beta.onrender.com",
    "https://crafticwebai.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000"
].filter(Boolean); // Remove undefined values

console.log('CORS allowed origins:', allowedOrigins);

// ✅ Enhanced CORS configuration
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked request from: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
        "Content-Type", 
        "Authorization", 
        "X-Requested-With",
        "Accept",
        "Origin"
    ],
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 200,
    preflightContinue: false
}));

// ✅ Add security headers for OAuth popups
app.use((req, res, next) => {
    // Allow popups for Google OAuth
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    
    // Additional security headers for cookies
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Allow iframe embedding if needed for OAuth
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    
    next();
});

// ✅ Stripe webhook before express.json()
app.post('/api/v1/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhookController);

app.use(express.json());
app.use(cookieParser());

dbConnect();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("api working fine");
});

// ✅ Test endpoint to verify CORS is working
app.get('/api/v1/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        cors: 'enabled',
        allowedOrigins: allowedOrigins,
        timestamp: new Date().toISOString()
    });
});

// ✅ Cookie test endpoint
app.get('/api/v1/test-cookie', (req, res) => {
    res.cookie('test_cookie', 'working', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',  // Required for cross-origin
        maxAge: 60000
    });
    res.json({ message: 'Cookie set successfully' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/website', websiteRouter);
app.use('/api/v1/billing', billingRouter);

app.listen(PORT, () => {
    console.log("server running at:", PORT);
    console.log("CORS enabled for origins:", allowedOrigins);
});