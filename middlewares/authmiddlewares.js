// middlewares/authmiddlewares.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};

// Added missing middleware that's imported in routes
export const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking admin status" });
  }
};

// Added missing middleware that's imported in routes
export const protect = authMiddleware;

export const vendorOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'vendor') {
      return res.status(403).json({ message: "Access denied: Vendor only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking vendor status" });
  }
};