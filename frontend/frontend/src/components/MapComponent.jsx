import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ initialLocation, onLocationChange }) => {
  const [marker, setMarker] = useState(null); // State to store marker instance

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBk1jBgQ45KhQ4wcS2Y6AUVYfDN-iC-VS4",
  });

  useEffect(() => {
    // Update marker position when initialLocation changes
    if (marker && initialLocation) {
      marker.setPosition(initialLocation);
    }
  }, [marker, initialLocation]);

  const handleMarkerDragEnd = () => {
    if (marker) {
      const position = marker.getPosition();
      onLocationChange({
        lat: position.lat(),
        lng: position.lng(),
      });
    }
  };

  const onLoad = (markerInstance) => {
    setMarker(markerInstance); // Save marker instance
  };

  if (!isLoaded) {
    return <p>Loading Google Maps...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialLocation}
      zoom={14}
    >
      <Marker
        position={initialLocation}
        draggable
        onDragEnd={handleMarkerDragEnd}
        onLoad={onLoad} // Save marker instance on load
      />
    </GoogleMap>
  );
};

export default MapComponent;

// AIzaSyBk1jBgQ45KhQ4wcS2Y6AUVYfDN-iC-VS4
