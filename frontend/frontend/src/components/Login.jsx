import React, { useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AuthContext from "../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      login(res.data.token, res.data.user); // Save token and user info in context
      navigate("/home"); // Redirect to Home Page
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };
  const goToRegister = () => {
    navigate("/register"); // Navigate to Login Page
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
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
          Login
        </button>
      </form>
      <p className={styles.loginOption}>
        Don't have an account?{" "}
        <span onClick={goToRegister} className={styles.loginLink}>
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
