import type { Request, Response, NextFunction } from 'express';
import type mongoose from 'mongoose';
import type { Document, Model } from 'mongoose';

declare global {
  interface ApiError {
    statusCode?: number;
    message: string;
    errors?: any;
    stack?: string;
  }

  interface RequesHandlerFn {
    (req: ApiRequest, res: Response, next: NextFunction): Promise<any>;
  }

  interface User {
    _id: mongoose.Schema.Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
    avatar: string;
  }

  interface FoodPartner {
    _id: mongoose.Schema.Types.ObjectIding;
    name: string;
    contactName: string;
    phone: string;
    address: string;
    email: string;
    password: string;
    avatar: string;
  }

  interface IUserDocument extends User, Document {
    comparePassword: (password: string) => Promise<boolean>;
    createJWT: () => string;
  }

  interface IUserModel extends Model<IUserDocument> {}

  interface IFoodPartnerDocument extends FoodPartner, Document {
    comparePassword: (password: string) => Promise<boolean>;
    createJWT: () => string;
  }

  interface IFoodPartnerModel extends Model<IFoodPartnerDocument> {}

  interface IBlackListToken extends Document {
    token: string;
    createdAt: Date;
  }

  interface ApiRequest extends Request {
    user?: User;
    foodPartner?: FoodPost;
  }

  interface FoodPostDocument extends Document {
    video: string;
    name: string;
    description: string;
    foodPartnerId: mongoose.Schema.Types.ObjectId;
  }

  interface decodedToken {
    userId: string;
    iat: number;
    exp?: number;
  }
}
export {};
