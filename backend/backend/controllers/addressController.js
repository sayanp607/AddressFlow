import Address from "../models/Address.js";

// Create a new address
export const createAddress = async (req, res) => {
  try {
    const { houseNumber, roadArea, category, latitude, longitude } = req.body;
    const newAddress = await Address.create({ houseNumber, roadArea, category, latitude, longitude });
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Failed to create address", error: error.message });
  }
};

// Get all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addresses", error: error.message });
  }
};

// Update an address by ID
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedAddress = await Address.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedAddress) return res.status(404).json({ message: "Address not found" });
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: "Failed to update address", error: error.message });
  }
};

// Delete an address by ID
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await Address.findByIdAndDelete(id);
    if (!deletedAddress) return res.status(404).json({ message: "Address not found" });
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete address", error: error.message });
  }
};

//toggle favourite
export const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    address.isFavorite = !address.isFavorite; // Toggle the favorite status
    await address.save();

    res.status(200).json({ success: true, address });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const validateAddressData = (addressData) => {
  if (!addressData.houseNumber || !addressData.roadArea || !addressData.category) {
    throw new Error("Missing required fields: House number, Road area, or Category.");
  }

  if (
    addressData.latitude < -90 || 
    addressData.latitude > 90 || 
    addressData.longitude < -180 || 
    addressData.longitude > 180
  ) {
    throw new Error("Invalid latitude or longitude values.");
  }

  return true;
};