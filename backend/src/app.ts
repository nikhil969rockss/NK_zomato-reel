import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import globalErrorMiddleware from './middlewares/error.middleware';

const app = express();

//middleware
app.use(express.json({ limit: '15mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

//routes import
import authRouter from './routes/auth.route';
import foodRouter from './routes/food.route';

//routes use

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/food', foodRouter);

//global error handler
app.use(globalErrorMiddleware);

export default app;
