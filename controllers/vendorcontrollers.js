import Vendor from "../models/vendor.js";

// Get all vendors
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({ message: "Vendors fetched successfully", vendors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch vendors" });
  }
};

// Add a new vendor
export const addVendor = async (req, res) => {
  const { name, location } = req.body;

  try {
    // Validate input data
    if (!name || !location) {
      return res.status(400).json({ message: "Name and location are required" });
    }

    // Create and save the new vendor
    const newVendor = new Vendor({ name, location });
    await newVendor.save();

    res.status(201).json({ message: "Vendor added successfully", vendor: newVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to add vendor" });
  }
};
