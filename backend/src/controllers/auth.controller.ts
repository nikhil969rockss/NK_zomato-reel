import { ENV } from '../config/env';
import BlackListTokenModel from '../models/blackListToken.model';
import UserModel from '../models/user.model';
import ApiErrorResponse from '../utils/ApiErrorResponse';
import ApiResonse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';
import { validateRegisterBody, validateLoginBody } from '../utils/validation';

/**
 * @description Register a new user using ```fullName```, ```email```, ```password``` in body
 */
const registerController = asyncHandler(async (req, res, _) => {
  const { email, password, fullName } = validateRegisterBody(req.body);

  // check if user already exists
  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist) {
    throw new ApiErrorResponse(429, 'User already exists with this email');
  }

  const newUser = await UserModel.create({ email, password, fullName });

  // generate token
  const token = newUser.createJWT();

  // set to cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
    secure: ENV.NODE_ENV === 'production' ? true : false,
  });

  const response = {
    _id: newUser._id,
    email: newUser.email,
    fullName: newUser.fullName,
  };

  return res
    .status(201)
    .json(new ApiResonse(201, 'User created successfully', response));
});

/**
 * @description Login user using  ```email```, ```password``` in body
 */
const loginController = asyncHandler(async (req, res, _) => {
  const { email, password } = validateLoginBody(req.body);

  // check if user already exists
  const isUserExist = await UserModel.findOne({ email });
  if (!isUserExist) {
    throw new ApiErrorResponse(429, 'User not registered with this email');
  }

  //compare password
  const isPasswordMatch = await isUserExist.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiErrorResponse(400, 'Invalid credentials');
  }

  // generate token
  const token = isUserExist.createJWT();

  // set to cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
    secure: ENV.NODE_ENV === 'production' ? true : false,
  });

  const response = {
    _id: isUserExist._id,
    email: isUserExist.email,
    fullName: isUserExist.fullName,
  };

  return res
    .status(201)
    .json(new ApiResonse(201, 'User created successfully', response));
});

/**
 * @description Logout user
 */
const logoutController = asyncHandler(async (req, res, _) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
  if (token) {
    await BlackListTokenModel.create({ token });
  }
  res.clearCookie('jwt');
  return res
    .status(200)
    .json(new ApiResonse(200, 'User logged out successfully'));
});

export { registerController, loginController, logoutController };
