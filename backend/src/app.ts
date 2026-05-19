import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import cors from 'cors';

import globalErrorMiddleware from './middlewares/error.middleware';

const app = express();

const __dirname = path.resolve();

//middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

//routes import
import authRouter from './routes/auth.route';
import foodRouter from './routes/food.route';
import { ENV } from './config/env';

//routes use

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/food', foodRouter);

//global error handler
app.use(globalErrorMiddleware);

//make ready for deployment
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.all('/{*splat}', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

export default app;
