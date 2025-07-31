import { NextFunction, Request, Response } from "express";
import { loginValidator, signUpValidator } from "../validators/auth.validator";
import catchAsync from "../catchAsync";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    // if (!body) throw new AppError(400, "Please enter credentials");
    await schema.validateAsync(body, { allowUnknown: false });
    return next();
  });
};

export const validateSignUp = validate(signUpValidator);

export const validateLogin = validate(loginValidator);
