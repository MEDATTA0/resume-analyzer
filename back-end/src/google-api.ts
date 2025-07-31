import vision from "@google-cloud/vision";
import { GoogleGenAI } from "@google/genai";
import { ApiError, Storage } from "@google-cloud/storage";
import { randomBytes } from "crypto";

const bucketName = process.env.BUCKET_NAME as string;
const genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const cloudVisionClient = new vision.ImageAnnotatorClient({
  keyFilename: "./config/send-ova-ef52c71ccce2.json",
});
export const geminiModel = genAIClient.models;

const storage = new Storage({
  keyFilename: "./config/send-ova-ef52c71ccce2.json",
});

export const uploadToGCS = async (fileBuffer: Buffer) => {
  try {
    const destFileName = `uploads/${Date.now()}${randomBytes(16)
      .toString("hex")
      .toLowerCase()}.pdf`;
    await storage
      .bucket(bucketName)
      .file(destFileName)
      .save(fileBuffer, { contentType: "application/pdf" });
    storage.bucket(bucketName);
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${destFileName}`;
    return publicUrl;
  } catch (err) {
    if (err instanceof ApiError) console.log(err);
    console.error(err);
  }
};

export const getOcrResultFromGCS = async (outputPrefix: string) => {
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: outputPrefix });

  const results: JSON[] = [];
  for (const file of files) {
    const [content] = await file.download();
    const json = JSON.parse(content.toString());
    results.push(json);
  }
  return results;
};

export const getTextAnnotation = (ocrResult: any[]) => {
  return ocrResult[0].responses[0].fullTextAnnotation.text;
};

export const getPromptForMyCV = (
  extractedText: string,
  jobs: string[] | undefined
) => {
  let jobPrompt = jobs
    ? `Based on following jobs \"${jobs.join()}\", what key skills or qualifications are missing in my CV (if any)?`
    : `Can you give me any potential job that fits my CV?`;
  const prompt = `I have extracted the following text from my CV:
  ${extractedText}
  Please analyze it and provide:
    1) A summary of my main skills and technical expertise.
    2) My education background, work experience, and any certifications mentioned.
    3) A list of soft skills or personal qualities that you'll have found.
    4) ${jobPrompt}
    5) Any recommendations to improve my CV or make me competitive for the role.
    `;
  return prompt;
};

export const getPromptForAnonymousCV = (
  extractedText: string,
  jobs: string[] | undefined
) => {
  let jobPrompt = jobs
    ? `Based on following jobs \"${jobs.join()}\", what key skills or qualifications are missing in this CV (if any)?`
    : `Can you give any potential job that fits the candidate's CV`;
  const prompt = `I have extracted the following text from a candidate's CV:
  ${extractedText}
  Please analyze this CV and provide:
    1) A summary of the candidate's main skills and technical expertise.
    2) The candidate's education background, work experience, and any certifications mentioned.
    3) A list of soft skills or personal qualities found in the text.
    4) ${jobPrompt}
    5) Any recommendations to improve this CV or make the candidate more competitive for the role.
    `;

  return prompt;
};

export const askGemini = async (prompt: string) => {
  const response = await geminiModel.generateContent({
    contents: prompt,
    model: "gemini-2.5-flash",
    config: { responseJsonSchema: true },
  });
  console.log(response);
  return response.text;
};
// export { cloudVisionClient, geminiModel };
