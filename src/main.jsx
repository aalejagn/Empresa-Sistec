// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// CSS
import "./assets/css/global.css";
import "./assets/css/catalago.css";
import "./assets/css/contactanos.css";
import "./assets/css/CategoryCarousel.css";
import "./assets/css/footer.css";
import "./assets/css/header.css";
import "./assets/css/auth.css";
import "./assets/css/style.css";
import "./assets/css/ubicacion.css";
import "./assets/css/valores.css";
import "./assets/css/carrito.css";
import "./assets/css/checkout.css";
import "./assets/css/perfil.css";
import "./assets/css/legal-pages.css"
import "./assets/css/LoginFooter.css"


// Providers (solo se importan los que se usan directamente)
import { CartProvider } from "./components/CartContext.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);