import type { Request, Response, NextFunction } from 'express';
import type { Document, Model } from 'mongoose';

declare global {
  interface ApiError {
    statusCode?: number;
    message: string;
    errors?: any;
    stack?: string;
  }

  interface RequesHandlerFn {
    (req: Request, res: Response, next: NextFunction): Promise<any>;
  }

  interface User {
    fullName: string;
    email: string;
    password: string;
  }

  interface IUserDocument extends User, Document {
    comparePassword: (password: string) => Promise<boolean>;
    createJWT: () => string;
  }

  interface IUserModel extends Model<IUserDocument> {}

  interface IBlackListToken extends Document {
    token: string;
    createdAt: Date;
  }

  interface ApiRequest extends Request {
    user?: User;
  }
}
export {};
