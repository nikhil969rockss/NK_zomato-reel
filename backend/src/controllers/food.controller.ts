import { uploadToCloud } from '../config/imagekit';
import FoodPostModel from '../models/foodPost.mode';
import ApiErrorResponse from '../utils/ApiErrorResponse';
import ApiResonse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';
import { validateFoodPostBody } from '../utils/validation';

const createFoodPostController = asyncHandler(async (req, res, _) => {
  // console.log(req.foodPartner);
  const { name, description } = validateFoodPostBody(req.body);

  const file = req.file;
  if (!file) {
    throw new ApiErrorResponse(400, 'post video is missing');
  }

  const result = await uploadToCloud({
    file: file.buffer.toBase64(),
    fileName: `${Date.now()}-${file.originalname}`,
  });
  //result.url

  //create post

  const newPost = await FoodPostModel.create({
    video: result.url,
    description,
    name,
    foodPartnerId: req.foodPartner?._id,
  });

  return res
    .status(201)
    .json(new ApiResonse(201, 'new post created successfully', newPost));
});

export { createFoodPostController };
