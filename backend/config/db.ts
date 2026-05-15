import mongoose from 'mongoose';
import { ENV } from './env';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI, {
      dbName: 'zomato-reels',
    });
    console.log(`Database connnection established ${conn.connection.host}`);
  } catch (error) {
    console.log(`Failed to connect to database`, error);
    process.exit(1);
  }
}
