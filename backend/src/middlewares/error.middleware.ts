import type { Request, Response, NextFunction } from 'express';
import ApiErrorResponse from '../utils/ApiErrorResponse';
import { ENV } from '../config/env';

function globalErrorMiddleware(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let error = err;
  console.log(err);

  if (!(err instanceof ApiErrorResponse)) {
    error = new Error(err.message || 'Internal server error');
    error.statusCode = 500;
    if (err.errors) {
      error.errors = err.errors;
    }
    if (err.stack) {
      error.stack = err.stack;
    }
  }

  const errorResponse = {
    statusCode: error.statusCode || 500,
    success: false,
    message: error.message || 'Internal server error',
    errors: error.errors || null,
    stack: ENV.NODE_ENV === 'development' ? error.stack : null,
  };

  return res.status(error.statusCode || 500).json(errorResponse);
}

export default globalErrorMiddleware;
