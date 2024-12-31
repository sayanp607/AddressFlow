import React from "react";

const LocationPermissionModal = ({ onEnableLocation, onSearchManually }) => {
  return (
    <div style={styles.modal}>
      <div style={styles.content}>
        <h3>Location Permission Required</h3>
        <p>
          To proceed, please allow location access or search for your address
          manually.
        </p>
        <button onClick={onEnableLocation} style={styles.button}>
          Enable Location
        </button>
        <button onClick={onSearchManually} style={styles.button}>
          Search Manually
        </button>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  content: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default LocationPermissionModal;
