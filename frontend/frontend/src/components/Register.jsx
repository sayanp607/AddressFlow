import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register", formData);
      alert("Registration successful! Redirecting to home...");
      navigate("/home"); // Redirect to Home Page
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };
  const goToLogin = () => {
    navigate("/login"); // Navigate to Login Page
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
      <p className={styles.loginOption}>
        Already have an account?{" "}
        <span onClick={goToLogin} className={styles.loginLink}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
