import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export function generateToken({ user }: { user: any }) {
  return jwt.sign({ userId: user.id }, ENV.JWT_SECRET);
}

export function verifyToken(token: string) {
  return jwt.verify(token, ENV.JWT_SECRET);
}
