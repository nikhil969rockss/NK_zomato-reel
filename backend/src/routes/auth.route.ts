import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
} from '../controllers/auth.controller';

const authRouter = express.Router();

/**
 * @route POST /auth/v1/register
 * @access - PUBLIC
 */
authRouter.post('/register', registerController);

/**
 * @route POST /auth/v1/login
 * @access - PUBLIC
 */
authRouter.post('/login', loginController);

/**
 * @route POST /auth/v1/logout
 * @access - PUBLIC
 */
authRouter.post('/logout', logoutController);

export default authRouter;
