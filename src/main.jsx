import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./assets/css/global.css";
import "./assets/css/catalago.css";
import "./assets/css/contactanos.css";
import "./assets/css/footer.css";
import "./assets/css/global.css";
import "./assets/css/header.css";
import "./assets/css/legal-pages.css";
// import './assets/css/login.css'
// import './assets/css/registrar.css'
import "./assets/css/auth.css";
import "./assets/css/style.css";
import "./assets/css/ubicacion.css";
import "./assets/css/valores.css";
import "./components/CartContext";
import { CartProvider } from "./components/CartContext";
import "./assets/css/carrito.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
