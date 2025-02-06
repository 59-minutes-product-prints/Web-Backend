// Controllers/orderController.js
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

// Fetch orders by user
export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed in the URL

  try {
    // Fetch orders for the specific user and populate user and vendor details
    const orders = await Order.find({ userId })
      .populate("userId", "name email")
      .populate("vendorId", "name location");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders for this user" });
  }
};

// Fetch order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the order by ID and populate user and vendor details
    const order = await Order.findById(id)
      .populate("userId", "name email")
      .populate("vendorId", "name location");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order fetched successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Find the order by ID and update the status
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};
