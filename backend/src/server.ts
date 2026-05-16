import { connectDB } from './config/db';
import { ENV } from './config/env';
import app from './app';

const HOST_URL =
  ENV.NODE_ENV === 'development'
    ? `http://localhost:${ENV.PORT}`
    : `your prod url`;

connectDB().then(() => {
  app.listen(ENV.PORT, () => {
    console.log(`Your server is started on PORT:${ENV.PORT} at ${HOST_URL}`);
  });
});
