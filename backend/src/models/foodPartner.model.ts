import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

const foodPartnerSchema = new mongoose.Schema<
  IFoodPartnerDocument,
  IFoodPartnerModel
>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
});

foodPartnerSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

foodPartnerSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, ENV.JWT_SECRET, { expiresIn: '7d' });
};

foodPartnerSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const FoodPartnerModel = mongoose.model<
  IFoodPartnerDocument,
  IFoodPartnerModel
>('FoodPartner', foodPartnerSchema);

export default FoodPartnerModel;
