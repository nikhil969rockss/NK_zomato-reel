import FoodPartnerModel from '../models/foodPartner.model';
import ApiErrorResponse from '../utils/ApiErrorResponse';
import asyncHandler from '../utils/asyncHandler';
import { verifyToken } from '../utils/token';

const authenticateFoodPartnerUser = asyncHandler(async (req, _, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new ApiErrorResponse(400, 'Missing Token, Please login first');
  }

  //verification of token
  let decoded;
  try {
    decoded = verifyToken(token) as decodedToken;
  } catch (error) {
    throw new ApiErrorResponse(400, 'Invalid Token', error);
  }

  const foodPartner = await FoodPartnerModel.findById(decoded.userId);
  if (!foodPartner) {
    throw new ApiErrorResponse(
      401,
      'Unauthorized access, This page only for food partners '
    );
  }
  req.foodPartner = foodPartner;
  next();
});

export { authenticateFoodPartnerUser };
