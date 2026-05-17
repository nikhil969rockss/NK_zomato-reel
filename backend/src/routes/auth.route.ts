import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  registerFoodPartnerController,
  loginFoodPartnerController,
  logoutFoodPartnerController,
} from '../controllers/auth.controller';

const authRouter = express.Router();

/*------------------------------ User Routes --------------------------------------------- */

/**
 * @route POST api/v1/auth/register
 * @access - PUBLIC
 */
authRouter.post('/register', registerController);

/**
 * @route POST api/v1/auth/login
 * @access - PUBLIC
 */
authRouter.post('/login', loginController);

/**
 * @route POST api/v1/auth/logout
 * @access - PUBLIC
 */
authRouter.post('/logout', logoutController);

/*------------------------------ Food Partner Routes --------------------------------------------- */

/**
 * @route POST api/v1/auth/food-partner/register
 * @access - PUBLIC
 */
authRouter.post('/food-partner/register', registerFoodPartnerController);

/**
 * @route POST api/v1/auth/food-partner/login
 * @access - PUBLIC
 */
authRouter.post('/food-partner/login', loginFoodPartnerController);

/**
 * @route POST api/v1/auth/food-partner/logout
 * @access - PUBLIC
 */
authRouter.post('/food-partner/login', logoutFoodPartnerController);

export default authRouter;
