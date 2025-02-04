import Order from "../models/order.js";

// Create a new order
export const createOrder = async (req, res) => {
  const { userId, vendorId, items, total } = req.body;

  try {
    // Validate input data
    if (!userId || !vendorId || !items || items.length === 0 || !total) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    // Create and save the new order
    const newOrder = new Order({ userId, vendorId, items, total });
    await newOrder.save();

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Fetch all orders
export const getOrders = async (req, res) => {
  try {
    // Fetch orders and populate user and vendor details
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("vendorId", "name location");

    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
