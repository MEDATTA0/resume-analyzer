import { NextFunction, Request, Response } from "express";
import AppError from "../appError";

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
  return res
    .status(err.statusCode)
    .json({ status: err.status, message: err.message, stack: err.stack });
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
  return res
    .status(err.statusCode)
    .json({ status: err.status, message: err.message });
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: AppError;
  if (!(err instanceof AppError)) {
    const statusCode = 500;
    const message = err.message || "error";
    error = new AppError(statusCode, message);
  } else {
    error = err;
  }

  return process.env.NODE_ENV === "production"
    ? sendErrorProd(error, req, res)
    : sendErrorDev(error, req, res);
};

export default globalErrorHandler;
