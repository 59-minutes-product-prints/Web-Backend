// Routes/orderRoutes.js
import express from "express";
import { placeOrder, getOrdersByUser, getOrderById, updateOrderStatus } from "../Controllers/ordercontroller.js";
import { protect, vendorOnly } from "../middlewares/authmiddlewares.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/", protect, getOrdersByUser);  // Ensure correct route for user-specific orders
router.get("/:id", protect, getOrderById);
router.put("/:id/status", vendorOnly, updateOrderStatus);

export default router;

