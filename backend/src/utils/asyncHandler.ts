import type { Response, NextFunction } from 'express';

function asyncHandler(handlerFn: RequesHandlerFn) {
  return async (req: ApiRequest, res: Response, next: NextFunction) => {
    try {
      await handlerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export default asyncHandler;
