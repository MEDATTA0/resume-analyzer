import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/prisma";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import ms, { StringValue } from "ms";
import catchAsync from "../catchAsync";
import AppError from "../appError";
import { signToken } from "../helpers/jwt.service";

export const sendResponse = (
  res: Response,
  statusCode: number,
  { ...data }
) => {
  const status = "success";
  const { token, ...rest } = data;
  if (token)
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: true,
    });

  return res.status(statusCode).json({ status, data: rest });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) return res.json({ status: "success", message: "Already login" });
    const hashedPassword = await argon2.hash(password);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    const token = signToken(newUser.id);
    return sendResponse(res, 200, {
      token,
      message: "Account created successfully",
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user)
      return next(new AppError(401, "email or password are incorrect"));
    // return res
    //   .status(404)
    //   .json({ status: "fail", message: "email or password are incorrect" });
    const isSame = await argon2.verify(user.password, password);
    if (!isSame)
      return next(new AppError(401, "email or password are incorrect"));
    //   return res
    //     .status(401)
    //     .json({ status: "fail", message: "email or password are incorrect" });

    const token = signToken(user.id);
    return sendResponse(res, 200, { token, message: "Logged in successfully" });
  }
);

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) return next(new AppError(400, "You're not logged in"));
    return res
      .clearCookie(token)
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  }
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
