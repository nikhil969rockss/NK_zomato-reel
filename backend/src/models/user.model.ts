import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

const userSchema = new mongoose.Schema<IUserDocument, IUserModel>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        'https://plus.unsplash.com/premium_vector-1728560971513-32c0ac5e2c30?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//methos

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, ENV.JWT_SECRET, { expiresIn: '7d' });
};

const UserModel = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export default UserModel;
