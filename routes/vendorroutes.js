import express from "express";
import { getVendors, getVendorById, registerVendor } from "../Controllers/vendorController.js";
import { authMiddleware, adminOnly } from "../middlewares/authmiddlewares.js"; // Fixed import name

const router = express.Router();

router.get("/", getVendors);
router.get("/:id", getVendorById);
router.post("/register", authMiddleware, registerVendor); // Protecting vendor registration

export default router;

