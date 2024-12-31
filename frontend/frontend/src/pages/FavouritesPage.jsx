import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FaHeart } from "react-icons/fa";

const FavoritesPage = () => {
  const [favoriteAddresses, setFavoriteAddresses] = useState([]);

  useEffect(() => {
    fetchFavoriteAddresses();
  }, []);

  const fetchFavoriteAddresses = async () => {
    try {
      const res = await axiosInstance.get("/addresses");
      const favorites = res.data.filter((address) => address.isFavorite);
      setFavoriteAddresses(favorites);
    } catch (error) {
      alert("Failed to fetch favorite addresses. Please try again.");
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await axiosInstance.put(`/addresses/${id}/favorite`);
      fetchFavoriteAddresses(); // Refresh the list after removing a favorite
    } catch (error) {
      alert("Failed to update favorite status.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Favorite Locations</h2>
      {favoriteAddresses.length > 0 ? (
        <ul>
          {favoriteAddresses.map((address) => (
            <li key={address._id} style={styles.addressItem}>
              <p>
                {address.houseNumber}, {address.roadArea} ({address.category})
              </p>
              <p>
                Latitude: {address.latitude}, Longitude: {address.longitude}
              </p>
              <button
                style={styles.removeButton}
                onClick={() => handleRemoveFavorite(address._id)}
              >
                <FaHeart style={styles.heartIcon} /> Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noFavorites}>You have no favorite locations.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  addressItem: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
    textAlign: "left",
  },
  removeButton: {
    marginTop: "10px",
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  heartIcon: {
    marginRight: "5px",
    fontSize: "16px",
    color: "white",
  },
  noFavorites: {
    fontSize: "18px",
    color: "#888",
    marginTop: "20px",
  },
};

export default FavoritesPage;
