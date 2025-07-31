import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import { validateLogin, validateSignUp } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", validateSignUp, signup);
router.get("/auth", logout);
router.post("/login", validateLogin, login);
export default router;
