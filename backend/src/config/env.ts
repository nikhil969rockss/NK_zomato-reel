import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT! || '5000',
  MONGO_URI: process.env.MONGO_URI!,
  NODE_ENV: process.env.NODE_ENV!,
  JWT_SECRET: process.env.JWT_SECRET!,
  IMAGE_KIT_PUBLIC_KEY: process.env.IMAGE_KIT_PUBLIC_KEY!,
  IMAGE_KIT_URL: process.env.IMAGE_KIT_URL!,
  IMAGE_KIT_PRIVATE_KEY: process.env.IMAGE_KIT_PRIVATE_KEY!,
};
