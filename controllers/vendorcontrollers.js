// controllers/vendorcontroller.js
import Vendor from "../models/vendor.js";

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json({ message: "Vendors fetched successfully", vendors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch vendors" });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching vendor" });
  }
};

export const registerVendor = async (req, res) => {
  try {
    const { name, email, phone, location, services } = req.body;
    const newVendor = new Vendor({
      name,
      email,
      phone,
      location,
      services
    });
    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully", vendor: newVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering vendor" });
  }
};