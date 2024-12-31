import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  houseNumber: { type: String, required: true },
  roadArea: { type: String, required: true },
  category: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  isFavorite: { type: Boolean, default: false },
});

const Address = mongoose.model("Address", AddressSchema);
export default Address;
