import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  FaHome,
  FaRegHeart,
  FaHeart,
  FaUserFriends,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";

const MapPreviewModal = ({ isOpen, address, onClose }) => {
  if (!isOpen || !address) return null;

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h3>
          Map Preview for {address.houseNumber}, {address.roadArea}
        </h3>
        <div style={styles.mapContainer}>
          <iframe
            title="Map Preview"
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${address.latitude},${address.longitude}&z=15&output=embed`}
          />
        </div>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

const ManageAddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    return savedSearches ? JSON.parse(savedSearches) : [];
  });
  const [isMapPreviewOpen, setIsMapPreviewOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [updatedAddress, setUpdatedAddress] = useState({
    houseNumber: "",
    roadArea: "",

    category: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get("/addresses");
      setAddresses(res.data);
      setFilteredAddresses(res.data);
    } catch (error) {
      alert("Failed to fetch addresses. Please try again.");
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await axiosInstance.put(`/addresses/${id}/favorite`);
      fetchAddresses();
    } catch (error) {
      alert("Failed to update favorite status.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addRecentSearch(searchQuery.trim());
      filterAddresses(searchQuery);
      setSearchQuery("");
    }
  };

  const addRecentSearch = (query) => {
    if (query !== "") {
      const updatedSearches = [query, ...recentSearches].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  };

  const filterAddresses = (query) => {
    const filtered = addresses.filter(
      (address) =>
        address.houseNumber.toLowerCase().includes(query.toLowerCase()) ||
        address.roadArea.toLowerCase().includes(query.toLowerCase()) ||
        address.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAddresses(filtered);
  };

  const handleSavedLocationClick = (address) => {
    const query = `${address.houseNumber}, ${address.roadArea} (${address.category})`;
    setSearchQuery(query);
    addRecentSearch(query);
    filterAddresses(query);
  };

  const handleViewFavorites = () => {
    navigate("/favorites");
  };

  const handleMapPreview = (address) => {
    setSelectedAddress(address);
    setIsMapPreviewOpen(true);
  };

  const closeMapPreview = () => {
    setIsMapPreviewOpen(false);
    setSelectedAddress(null);
  };

  const handleEditAddress = (address) => {
    setIsEditing(true);
    setAddressToEdit(address);
    setUpdatedAddress({
      houseNumber: address.houseNumber,
      roadArea: address.roadArea,

      category: address.category,
    });
  };

  const handleChange = (e) => {
    setUpdatedAddress({
      ...updatedAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(
        `/addresses/${addressToEdit._id}`,
        updatedAddress
      );
      fetchAddresses();
      setIsEditing(false);
      setAddressToEdit(null);
    } catch (error) {
      alert("Failed to update address.");
    }
  };

  const handleDeleteAddress = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/addresses/${id}`);
        fetchAddresses();
      } catch (error) {
        alert("Failed to delete address.");
      }
    }
  };

  const categorizeAddresses = (addresses) => {
    return {
      home: addresses.filter((addr) => addr.category.toLowerCase() === "home"),
      office: addresses.filter(
        (addr) => addr.category.toLowerCase() === "office"
      ),
      familyAndFriends: addresses.filter(
        (addr) => addr.category.toLowerCase() === "family & friends"
      ),
      other: addresses.filter(
        (addr) =>
          addr.category.toLowerCase() !== "home" &&
          addr.category.toLowerCase() !== "office" &&
          addr.category.toLowerCase() !== "family & friends"
      ),
    };
  };

  const categorizedAddresses = categorizeAddresses(filteredAddresses);

  return (
    <div>
      <h2>Saved Locations</h2>
      <button onClick={handleViewFavorites} style={styles.viewFavoritesButton}>
        View Favorites
      </button>
      <input
        type="text"
        placeholder="Search your area/pincode/apartment..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearchSubmit}
        style={styles.searchBar}
      />
      {Object.entries(categorizedAddresses).map(([category, addresses]) => (
        <div key={category} style={styles.categorySection}>
          <h3 style={styles.categoryTitle}>
            {category === "home" && <FaHome style={styles.icon} />}
            {category === "office" && <MdLocalPostOffice style={styles.icon} />}
            {category === "familyAndFriends" && (
              <FaUserFriends style={styles.icon} />
            )}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>
          {addresses.length > 0 ? (
            <ul>
              {addresses.map((address) => (
                <li
                  key={address._id}
                  style={styles.addressItem}
                  onClick={() => handleSavedLocationClick(address)}
                >
                  <p>
                    {address.houseNumber}, {address.roadArea}
                  </p>
                  <p>
                    Latitude: {address.latitude}, Longitude: {address.longitude}
                  </p>
                  <div style={styles.actionButtons}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(address._id);
                      }}
                      style={styles.favoriteButton}
                    >
                      {address.isFavorite ? (
                        <FaHeart style={styles.favoriteIcon} />
                      ) : (
                        <FaRegHeart style={styles.favoriteIcon} />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAddress(address);
                      }}
                      style={styles.editButton}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(address._id);
                      }}
                      style={styles.deleteButton}
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMapPreview(address);
                      }}
                      style={styles.mapPreviewButton}
                    >
                      Map Preview
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses in this category.</p>
          )}
        </div>
      ))}

      {isEditing && (
        <div style={styles.editForm}>
          <h3>Edit Address</h3>
          <form onSubmit={handleSubmitEdit}>
            <input
              type="text"
              name="houseNumber"
              value={updatedAddress.houseNumber}
              onChange={handleChange}
              placeholder="House Number"
            />
            <input
              type="text"
              name="roadArea"
              value={updatedAddress.roadArea}
              onChange={handleChange}
              placeholder="Road Area"
            />

            <input
              type="text"
              name="category"
              value={updatedAddress.category}
              onChange={handleChange}
              placeholder="Category"
            />
            <button className="savebtn" type="submit">
              Save
            </button>
          </form>
        </div>
      )}

      <div style={styles.recentSearchesSection}>
        <h3>Recent Searches</h3>
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index} onClick={() => filterAddresses(search)}>
              <FaMapMarkerAlt style={styles.mapIcon} />
              {search}
            </li>
          ))}
        </ul>
      </div>

      <MapPreviewModal
        isOpen={isMapPreviewOpen}
        address={selectedAddress}
        onClose={closeMapPreview}
      />
    </div>
  );
};

const styles = {
  savebtn: {
    backgroundColor: "FFCCCB",
    borderRadius: "15px",
  },
  editForm: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "800px", // Increase maxWidth to accommodate horizontal layout
    backgroundColor: "#FFEB3B", // Light blue background color
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    zIndex: "1000",
    display: "flex",
    flexDirection: "row", // Horizontal layout
    flexWrap: "wrap", // Allow wrapping to the next line if necessary
    gap: "15px", // Space between inputs
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "999",
  },
  formInput: {
    width: "48%", // Make inputs half-width to fit two on a row
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  formButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%", // Make the submit button span the full width
  },
  formButtonHover: {
    backgroundColor: "#45a049",
  },
  searchBar: {
    padding: "10px",
    width: "100%",
    marginBottom: "20px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  viewFavoritesButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  categorySection: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  categoryTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "10px",
    fontSize: "24px",
    color: "#007bff",
  },
  addressItem: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoriteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  favoriteIcon: {
    fontSize: "20px",
    color: "#ff5722",
  },
  mapPreviewButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  recentSearches: {
    marginTop: "30px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  recentTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  recentItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "16px",
  },
  mapIcon: {
    marginRight: "10px",
    fontSize: "20px",
    color: "#28a745",
  },
  // Modal Styles
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
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "80%",
    maxWidth: "800px",
    textAlign: "center",
  },
  mapContainer: {
    marginBottom: "20px",
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  // Add new styles for edit and delete buttons
  editButton: {
    backgroundColor: "#ffc107",
    color: "white",
    border: "none",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  actionButtons: {
    display: "flex",
    alignItems: "center",
  },
  // Existing styles remain unchanged
};

export default ManageAddressPage;
