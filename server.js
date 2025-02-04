import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet"; // Security headers
import morgan from "morgan"; // Request logging
import mongoose from "mongoose";
import authroutes from "./routes/authroutes.js";
import vendorroutes from "./routes/vendorroutes.js";
import orderroutes from "./routes/orderroutes.js";
import { errorhandler } from "./middlewares/errorhandler.js";
import { authMiddleware } from "./middlewares/authmiddlewares.js";
import connectdb from "./config/db.js";
import admin from "./config/firebase.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Security headers
app.use(helmet());

// Request logging (development mode)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authroutes);
app.use("/api/vendors", vendorroutes);
app.use("/api/orders", authMiddleware, orderroutes); // Protected orders route

// Error handling
app.use(errorhandler);

// Database connection
connectdb();

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
