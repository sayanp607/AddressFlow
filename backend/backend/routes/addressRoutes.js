import express from "express";
import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  toggleFavorite
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/", createAddress);         // Create an address
router.get("/", getAddresses);           // Get all addresses
router.put("/:id", updateAddress);       // Update an address by ID
router.delete("/:id", deleteAddress);    // Delete an address by ID
router.put("/:id/favorite", toggleFavorite);
export default router;
