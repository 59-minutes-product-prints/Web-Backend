// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authmiddlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);

export default router;

