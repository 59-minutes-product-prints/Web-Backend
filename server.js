// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectdb from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import vendorRoutes from "./Routes/vendorRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";

import { errorhandler } from "./middlewares/errorhandler.js";
import { authMiddleware } from "./middlewares/authmiddlewares.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Security middleware
app.use(helmet());

// Request logging in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectdb();
// console.log(MongoDB connected sucessful);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/orders", authMiddleware, orderRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Error handling middleware
app.use(errorhandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

export default app;