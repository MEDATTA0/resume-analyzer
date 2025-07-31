import { NextFunction, Request, Response } from "express";
import catchAsync from "../catchAsync";
import {
  askGemini,
  cloudVisionClient,
  getOcrResultFromGCS,
  getPromptForMyCV,
  getTextAnnotation,
  uploadToGCS,
} from "../google-api";
import AppError from "../appError";
import { sendResponse } from "./auth.controller";
import { prisma } from "../db/prisma";
import { decodeJWT } from "../helpers/jwt.service";
import pdf2md from "@opendocsg/pdf2md";

export const summarizeMyCV = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    const bucketName = process.env.BUCKET_NAME as string;
    const fileBuffer = req.file?.buffer;
    const mimeType = req.file?.mimetype;
    let candidateJobs = req.body.jobs ? req.body.jobs.split(", ") : undefined;
    if (!fileBuffer || !mimeType)
      return next(new AppError(400, "Please upload a file"));
    const fullText = await pdf2md(fileBuffer);
    const prompt = getPromptForMyCV(fullText, candidateJobs);
    const AiResponse = await askGemini(prompt);
    // if (token && AiResponse) {
    //   const userId = decodeJWT(token as string) as string;
    //   await prisma.history.create({
    //     data: {
    //       userId,
    //       analysisResult: AiResponse,
    //       uploadedCvUri: gscSourceUri,
    //       parsedTextUri: gscDestinationUri,
    //     },
    //   });
    // }
    return sendResponse(res, 200, { response: AiResponse });
  }
);
