import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authcontroller.js";
import { authMiddleware } from "../middlewares/authmiddlewares.js"; // Fixed import name

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile); // Applied correct middleware name

export default router;

