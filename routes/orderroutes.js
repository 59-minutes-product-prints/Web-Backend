import express from "express";
import { placeOrder, getOrdersByUser, getOrderById, updateOrderStatus } from "../controllers/ordercontroller.js";
import { protect, vendorOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/", protect, getOrdersByUser);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", vendorOnly, updateOrderStatus);

export default router;
