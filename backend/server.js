import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import demoRoutes from './src/routes/demoRoute.js';
import userRoutes from './src/routes/userRoute.js'
import statusRoutes from './src/routes/statusRoute.js';

const app = express();

// Security Headers
app.use(helmet());

// Strict CORS (only allow frontend origin)
app.use(cors({
    origin: process.env.ORIGIN_URL || 'http://localhost:5173',
    optionsSuccessStatus: 200
}));

app.use(express.json());

// Rate Limiting for sensitive POST routes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again later.' }
});

app.use('/api/demo', apiLimiter, demoRoutes);
app.use('/api/subscribe', apiLimiter, userRoutes);
app.use('/api/status', statusRoutes);

export default app;