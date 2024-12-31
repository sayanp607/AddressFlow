import React, { useState, useContext, useEffect } from "react";
import LocationPermissionModal from "../components/LocationPermissionModal";
import MapComponent from "../components/MapComponent";
import AddressForm from "../components/AddressForm";
import LocationContext from "../context/LocationContext";
import { useNavigate } from "react-router-dom";
const Home = ({ fetchAddresses }) => {
  const [showModal, setShowModal] = useState(true);
  const [mapCenter, setMapCenter] = useState(null); // Current map center
  const { location, updateLocation } = useContext(LocationContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Sync map center with location when location changes
    if (location) {
      setMapCenter(location);
    }
  }, [location]);

  const handleEnableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          updateLocation(newLocation);
          setMapCenter(newLocation);
          setShowModal(false); // Close the modal
        },
        () => {
          alert("Failed to get location. Please try searching manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSearchManually = () => {
    const defaultLocation = { lat: 37.7749, lng: -122.4194 }; // Default: San Francisco
    setMapCenter(defaultLocation);
    setShowModal(false); // Close the modal
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          updateLocation(newLocation);
          setMapCenter(newLocation); // Update map center dynamically
        },
        () => {
          alert("Failed to fetch your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  const handleManageAddresses = () => {
    navigate("/manage-addresses"); // Redirect to Manage Address Page
  };

  return (
    <div style={styles.container}>
      {showModal && (
        <LocationPermissionModal
          onEnableLocation={handleEnableLocation}
          onSearchManually={handleSearchManually}
        />
      )}
      {!showModal && (
        <>
          <MapComponent
            initialLocation={mapCenter} // Dynamic map center
            onLocationChange={(newLocation) => updateLocation(newLocation)}
          />
          <div style={styles.locationDetails}>
            {location ? (
              <p style={styles.locationText}>
                <strong>Current Location:</strong> Latitude {location.lat},
                Longitude {location.lng}
              </p>
            ) : (
              <p style={styles.locationText}>
                Please select a location on the map.
              </p>
            )}
          </div>
          <div style={styles.buttonContainer}>
            <button onClick={handleLocateMe} style={styles.button}>
              Locate Me
            </button>
          </div>

          <AddressForm fetchAddresses={fetchAddresses} />
          <div style={styles.buttonContainer}>
            <button onClick={handleManageAddresses} style={styles.manageButton}>
              Manage Addresses
            </button>
          </div>
        </>
      )}
      <h2 style={styles.title}>Welcome to the Home Page</h2>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  locationDetails: {
    margin: "20px 0",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  locationText: {
    fontSize: "16px",
    margin: 0,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  title: {
    textAlign: "center",
    marginTop: "30px",
  },
  manageButton: {
    borderRadius: "15px",
    backgroundColor: "lightgreen",
    padding: "10px",
  },
};

export default Home;
