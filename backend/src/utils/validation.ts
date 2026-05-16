import { z } from 'zod';
import ApiErrorResponse from './ApiErrorResponse';

type RegisterBody = {
  fullName: string;
  email: string;
  password: string;
};

export const validateRegisterBody = (body: RegisterBody) => {
  const schema = z.object({
    fullName: z
      .string({ error: 'full name is required' })
      .min(3, { error: 'Full name must be at least 3 characters' }),
    email: z.email({ error: 'Invalid email address' }),
    password: z
      .string({ error: 'password is required' })
      .min(6, { error: 'Password must be at least 6 characters' }),
  });
  const { success, data, error } = schema.safeParse(body);
  if (!success) {
    throw new ApiErrorResponse(400, z.prettifyError(error), error);
  }
  return data;
};

type LoginBody = {
  email: string;
  password: string;
};

export const validateLoginBody = (body: LoginBody) => {
  const schema = z.object({
    email: z.email({ error: 'Invalid email address' }),
    password: z.string({ error: 'Password is required' }),
  });
  const { success, data, error } = schema.safeParse(body);
  if (!success) {
    throw new ApiErrorResponse(400, z.prettifyError(error), error);
  }
  return data;
};

type FoodPartnerRegisterBody = {
  name: string;
  email: string;
  password: string;
};

export const validateFoodPartnerRegisterBody = (
  body: FoodPartnerRegisterBody
) => {
  const schema = z.object({
    name: z
      .string({ error: 'Name is required' })
      .min(2, { error: 'name must be atleast 2 charcter' }),
    email: z.email({ error: 'Invalid email address' }),
    password: z
      .string({ error: 'Password is required' })
      .min(6, { error: 'Password must be atleast 6 characters' }),
  });
  const { error, success, data } = schema.safeParse(body);
  if (!success) {
    throw new ApiErrorResponse(400, z.prettifyError(error), error);
  }
  return data;
};

type FoodPartnerLoginBody = {
  email: string;
  password: string;
};

export const validateFoodPartnerLoginBody = (body: FoodPartnerLoginBody) => {
  const schema = z.object({
    email: z.email({ error: 'Invalid email address' }),
    password: z.string({ error: 'Password is required' }),
  });
  const { error, success, data } = schema.safeParse(body);
  if (!success) {
    throw new ApiErrorResponse(400, z.prettifyError(error), error);
  }
  return data;
};
