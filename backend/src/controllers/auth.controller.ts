import { ENV } from '../config/env';
import BlackListTokenModel from '../models/blackListToken.model';
import FoodPartnerModel from '../models/foodPartner.model';
import UserModel from '../models/user.model';
import ApiErrorResponse from '../utils/ApiErrorResponse';
import ApiResonse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';
import {
  validateRegisterBody,
  validateLoginBody,
  validateFoodPartnerRegisterBody,
  validateFoodPartnerLoginBody,
} from '../utils/validation';

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
  res.cookie('token', token, {
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
  res.cookie('token', token, {
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
    .json(new ApiResonse(200, 'User logged in successfully', response));
});

/**
 * @description Logout user
 */
const logoutController = asyncHandler(async (req, res, _) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
  if (token) {
    await BlackListTokenModel.create({ token });
  }
  res.clearCookie('token');
  return res
    .status(200)
    .json(new ApiResonse(200, 'User logged out successfully'));
});

/*------------------------------ Food Partner Controllers --------------------------------------------- */
/**
 * @description Register food parter who can add food post fields - ```name```, ```email``` , ```password```
 */
const registerFoodPartnerController = asyncHandler(async (req, res, _) => {
  const { name, email, password, contactName, address, phone } =
    validateFoodPartnerRegisterBody(req.body);

  const isFoodPartnerExist = await FoodPartnerModel.findOne({ email });
  if (isFoodPartnerExist) {
    throw new ApiErrorResponse(
      429,
      'food partner already exists with this email'
    );
  }

  const newFoodPartner = await FoodPartnerModel.create({
    name,
    email,
    password,
    contactName,
    address,
    phone,
  });

  //create token
  const token = newFoodPartner.createJWT();

  //attach it to cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production' ? true : false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
  });

  const response = {
    _id: newFoodPartner._id,
    name: newFoodPartner.name,
    contactName: newFoodPartner.contactName,
    phone: newFoodPartner.phone,
    address: newFoodPartner.address,
    email: newFoodPartner.email,
  };
  return res
    .status(201)
    .json(
      new ApiResonse(201, 'Food partner user created successfully', response)
    );
});

/**
 * @description Lodin food parter who can add food post fields - ```email``` , ```password```
 */
const loginFoodPartnerController = asyncHandler(async (req, res, _) => {
  const { email, password } = validateFoodPartnerLoginBody(req.body);

  const isFoodPartnerExists = await FoodPartnerModel.findOne({ email });
  if (!isFoodPartnerExists) {
    throw new ApiErrorResponse(
      400,
      "Food partner doesn't exists with this email"
    );
  }
  const isPasswordMatch = await isFoodPartnerExists.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiErrorResponse(400, 'Invalid credentials');
  }

  //create token
  const token = isFoodPartnerExists.createJWT();

  //attach it to cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production' ? true : false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
  });

  const response = {
    _id: isFoodPartnerExists._id,
    name: isFoodPartnerExists.name,
    contactName: isFoodPartnerExists.contactName,
    phone: isFoodPartnerExists.phone,
    email: isFoodPartnerExists.email,
    address: isFoodPartnerExists.address,
  };
  return res
    .status(200)
    .json(new ApiResonse(200, 'Food partner logged in successfully', response));
});

const logoutFoodPartnerController = asyncHandler(async (req, res, _) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (token) {
    await BlackListTokenModel.create({ token });
  }
  res.clearCookie('token');
  return res
    .status(200)
    .json(new ApiResonse(200, 'Food partner logged out successfully'));
});

/**
 * This controller is  to get the logoged in user either user or food partner
 */
const getLoggedInUserController = asyncHandler(async (req, res, _) => {
  const user = req?.user || req?.foodPartner;
  if (!user) {
    throw new ApiErrorResponse(401, 'Unauthorized access');
  }
  user.password = undefined;
  return res
    .status(200)
    .json(new ApiResonse(200, 'Fetched logged in user succesfully', user));
});

/**
 * This controller is  to get the logoged in food partenr
 */
const getLoggedInFoodPartnerController = asyncHandler(async (req, res, _) => {
  const foodPartner = req?.foodPartner;
  if (!foodPartner) {
    throw new ApiErrorResponse(401, 'Unauthorized access');
  }
  foodPartner.password = undefined;
  return res
    .status(200)
    .json(new ApiResonse(200, 'Fetched food-partner details', foodPartner));
});

export {
  registerController,
  loginController,
  logoutController,
  registerFoodPartnerController,
  loginFoodPartnerController,
  logoutFoodPartnerController,
  getLoggedInUserController,
  getLoggedInFoodPartnerController,
};
