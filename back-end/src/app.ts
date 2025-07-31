import express from "express";
import authRouter from "./routes/auth.route";
import globalErrorHandler from "./controllers/error.controller";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { summarizeMyCV } from "./controllers/cv.controller";
import multer from "multer";
import cors from "cors";
import rateLimit from "express-rate-limit";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));
app.use(rateLimit({ limit: 25, windowMs: 60 * 60 * 1000 }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello from Express" });
});

app.post("/api/summarize-my-cv", upload.single("file"), summarizeMyCV);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  return res
    .status(404)
    .json({ message: `Route ${req.originalUrl} not found` });
});

app.use(globalErrorHandler);

export default app;
