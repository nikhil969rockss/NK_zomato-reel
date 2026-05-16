import express from 'express';
import morgan from 'morgan';

import globalErrorMiddleware from './middlewares/error.middleware';

const app = express();

//middleware
app.use(express.json({ limit: '15mb' }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

//routes import
import authRouter from './routes/auth.route';

//routes use

app.use('/api/v1/auth', authRouter);

//global error handler
app.use(globalErrorMiddleware);

export default app;
