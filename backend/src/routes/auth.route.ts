import express from 'express';
import {
  registerController,
  loginController,
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

export default authRouter;
