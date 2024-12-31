import React, { useState, useContext } from "react";
import LocationContext from "../context/LocationContext";
import axiosInstance from "../utils/axiosInstance";
import "./AddressForm.css"; // Add CSS file for better styles

const AddressForm = ({ fetchAddresses }) => {
  const { location } = useContext(LocationContext);
  const [formData, setFormData] = useState({
    houseNumber: "",
    roadArea: "",
    category: "Home",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      alert("Please select a location on the map.");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = {
        ...formData,
        latitude: location.lat,
        longitude: location.lng,
      };
      await axiosInstance.post("/addresses", data);
      alert("Address saved successfully!");
      setFormData({ houseNumber: "", roadArea: "", category: "Home" });
      if (fetchAddresses) {
        await fetchAddresses();
      }
    } catch (error) {
      alert("Failed to save address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <input
        name="houseNumber"
        placeholder="House/Flat/Block No."
        value={formData.houseNumber}
        onChange={handleChange}
        required
      />
      <input
        name="roadArea"
        placeholder="Apartment/Road/Area"
        value={formData.roadArea}
        onChange={handleChange}
        required
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Home">Home</option>
        <option value="Office">Office</option>
        <option value="Family & Friends">Family & Friends</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
};

export default AddressForm;
