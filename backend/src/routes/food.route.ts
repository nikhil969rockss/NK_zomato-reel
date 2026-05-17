import express from 'express';
import { authenticateFoodPartnerUser } from '../middlewares/auth.middleware';
import upload from '../config/multer';
import { createFoodPostController } from '../controllers/food.controller';

const foodRouter = express.Router();

foodRouter.post(
  '/',
  authenticateFoodPartnerUser,
  upload.single('video'),
  createFoodPostController
);

export default foodRouter;
