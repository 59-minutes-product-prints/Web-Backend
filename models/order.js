import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }, // New: Store price per item
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    items: [itemSchema], // New: Use sub-schema for better structure
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending", // New: Track order status
    },
  },
  { timestamps: true } // New: Auto-generate `createdAt` and `updatedAt`
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);

