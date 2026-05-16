import mongoose from 'mongoose';

const blackListTokenSchema = new mongoose.Schema<IBlackListToken>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1000 * 60 * 60 * 24 * 8, // 8 days
  },
});

const BlackListTokenModel = mongoose.model<IBlackListToken>(
  'BlackListToken',
  blackListTokenSchema
);

export default BlackListTokenModel;
