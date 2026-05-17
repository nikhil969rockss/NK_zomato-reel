import express from 'express';
import {
  authenticateFoodPartnerUser,
  authenticateUser,
} from '../middlewares/auth.middleware';
import upload from '../config/multer';
import {
  createFoodPostController,
  getAllFoodPostsController,
} from '../controllers/food.controller';

const foodRouter = express.Router();

/**
 * @route - POST /api/v1/food
 * @access - PROTECTED [only food partner can access]
 */
foodRouter.post(
  '/',
  authenticateFoodPartnerUser,
  upload.single('video'),
  createFoodPostController
);

/**
 * @route - GET /api/v1/food
 * @access - PROTECTED [only food partner and user can access]
 */
foodRouter.get('/', authenticateUser, getAllFoodPostsController);

export default foodRouter;
