import mongoose from 'mongoose';

const foodPostSchema = new mongoose.Schema<FoodPostDocument>(
  {
    video: {
      type: String,
      required: [true, 'Video Url is required'],
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    foodPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodPartner',
      required: [true, 'food partner id is required'],
    },
  },
  { timestamps: true }
);

const FoodPostModel = mongoose.model('FoodPost', foodPostSchema);

export default FoodPostModel;
