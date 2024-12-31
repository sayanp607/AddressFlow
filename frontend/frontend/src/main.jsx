import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <LocationProvider>
      <App />
    </LocationProvider>
  </AuthProvider>
);
