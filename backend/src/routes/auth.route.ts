import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  registerFoodPartnerController,
  loginFoodPartnerController,
  logoutFoodPartnerController,
  getLoggedInUserController,
  getLoggedInFoodPartnerController,
} from '../controllers/auth.controller';
import {
  authenticateFoodPartnerUser,
  authenticateUser,
} from '../middlewares/auth.middleware';

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

// -----------------------------------------------
/**
 * @route POST api/v1/auth/get-user
 * @access - PROTECTED [only user and food partner can access]
 */
authRouter.get('/get-user', authenticateUser, getLoggedInUserController);

/**
 * @route POST api/v1/auth/get-food-partner
 * @access - PROTECTED [only food partner can access]
 */
authRouter.get(
  '/get-food-partner',
  authenticateFoodPartnerUser,
  getLoggedInFoodPartnerController
);

export default authRouter;
