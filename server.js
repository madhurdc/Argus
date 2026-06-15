import express from 'express';
import demoRoutes from './src/routes/demoRoute.js';
import userRoutes from './src/routes/userRoute.js'


const app = express();

app.use(express.json());
app.use('/api/demo', demoRoutes);
app.use('/api/subscribe', userRoutes);

export default app;