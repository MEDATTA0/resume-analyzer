import { NextFunction, Request, Response } from "express";
import AppError from "./appError";
import Joi from "joi";

const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      if (err instanceof Joi.ValidationError)
        return next(new AppError(400, err.details[0].message));
      return next(err);
    }
  };
};

export default catchAsync;
