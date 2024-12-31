import React, { createContext, useState } from "react";

// Create the LocationContext
const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // Store the user's current location
  const [addresses, setAddresses] = useState([]); // Store the list of addresses

  // Update the user's current location
  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  // Add a new address to the list
  const createAddress = (newAddress) => {
    setAddresses((prev) => [...prev, newAddress]);
  };

  // Update an existing address by ID
  const updateAddress = (id, updatedAddress) => {
    setAddresses((prev) =>
      prev.map((address) => (address._id === id ? updatedAddress : address))
    );
  };

  // Delete an address by ID
  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((address) => address._id !== id));
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        updateLocation,
        addresses,
        setAddresses, // For fetching addresses from the backend
        createAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
