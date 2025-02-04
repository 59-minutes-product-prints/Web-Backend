import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true,
      set: (name) => name.charAt(0).toUpperCase() + name.slice(1)  // Capitalize first letter
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      match: [/\S+@\S+\.\S+/, "Invalid email format"] 
    },
    phone: { 
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number"] // Validates E.164 format
    },
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    services: [{ type: String, required: true }],
    rating: { 
      type: Number, 
      default: 0, 
      min: 0, 
      max: 5 
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", VendorSchema);
