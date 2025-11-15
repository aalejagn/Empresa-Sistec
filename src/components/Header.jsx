import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "./SearchContext";
import "../assets/css/header.css";
import { useCart } from "./CartContext";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const hamburgerRef = useRef(null);
  const navMenuRef = useRef(null);
  const searchContainerRef = useRef(null);
  const logoRef = useRef(null);
  const navActionsRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();
  const { cart } = useCart(); // ← PARA SABER CUÁNTOS LIBROS HAY EN EL CARRITO
  const [cartAnimated, setCartAnimated] = useState(false);
  const prevCartCountRef = useRef(0);

  // === CERRAR MENÚ AL CAMBIAR DE PÁGINA ===
  useEffect(() => {
    setMenuAbierto(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

  // === ABRIR/CERRAR MENÚ ===
  const openMenu = () => {
    setMenuAbierto(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setMenuAbierto(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => (menuAbierto ? closeMenu() : openMenu());

  // === CERRAR CON ESC ===
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuAbierto) closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuAbierto]);

  // === MANEJAR BÚSQUEDA EN TIEMPO REAL ===
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Si hay texto, navegar a categorías automáticamente
    if (value.trim() !== "" && location.pathname !== "/categorias") {
      navigate("/categorias");
    }
  };

  // === LIMPIAR BÚSQUEDA AL SALIR DE CATEGORÍAS ===
  useEffect(() => {
    if (location.pathname !== "/categorias") {
      setSearchTerm("");
    }
  }, [location.pathname, setSearchTerm]);

  // === REUBICAR BUSCADOR ===
  useEffect(() => {
    const adjustSearchPosition = () => {
      const searchContainer = searchContainerRef.current;
      const logo = logoRef.current;
      const navActions = navActionsRef.current;

      if (!searchContainer || !logo || !navActions) return;

      if (window.innerWidth <= 768) {
        if (searchContainer.parentNode === navActions) {
          navActions.removeChild(searchContainer);
          logo.after(searchContainer);
          searchContainer.style.width = "100%";
          searchContainer.style.marginTop = "0.5rem";
        }
      } else {
        if (searchContainer.parentNode !== navActions) {
          searchContainer.parentNode.removeChild(searchContainer);
          navActions.prepend(searchContainer);
          searchContainer.style.width = "";
          searchContainer.style.marginTop = "";
        }
      }
    };

    adjustSearchPosition();
    const handleResize = () => {
      adjustSearchPosition();
      if (window.innerWidth > 768) closeMenu();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === CIERRE AL HACER CLICK EN LINK (MÓVIL) ===
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  };

  // === LIMPIEZA AL DESMONTAR ===
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Contador de libros en el carrito
  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);

  // Detectar cuando se agrega un item al carrito
  useEffect(() => {
    const currentCount = cart.reduce((total, item) => total + item.cantidad, 0);

    if (currentCount > prevCartCountRef.current) {
      // Se agregó un item, activar animación
      setCartAnimated(true);
      setTimeout(() => setCartAnimated(false), 600);
    }

    prevCartCountRef.current = currentCount;
  }, [cart]);

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="nav-container">
          {/* LOGO (OCULTO EN MÓVIL) */}
          <div className="logo" ref={logoRef}>
            <Link to="/" className="logo-link" onClick={handleLinkClick}>
              <img
                src="/assets/Images/logo.png"
                alt="SISTEC"
                className="logo-imagen"
              />
              <span className="logo-text">SISTEC READ</span>
            </Link>
          </div>

          {/* MENÚ */}
          <ul
            className={`nav-menu ${menuAbierto ? "active" : ""}`}
            ref={navMenuRef}
          >
            {/* HEADER DENTRO DEL MENÚ MÓVIL */}
            <div className="mobile-menu-header">
              {/* LOGO + TEXTO */}
              <Link to="/" className="logo-link" onClick={handleLinkClick}>
                <img
                  src="/assets/Images/logo.png"
                  alt="SISTEC"
                  className="logo-imagen"
                />
                <span className="logo-text">SISTEC READ</span>
              </Link>

              {/* ÍCONOS + BOTÓN CERRAR */}
              <div className="mobile-menu-icons">
                <Link
                  to="/carrito"
                  className={`icon-link ${cartAnimated ? "cart-added" : ""}`}
                  aria-label="Carrito"
                  onClick={handleLinkClick}
                >
                  <i className="fas fa-shopping-cart"></i>
                  {cartCount > 0 && (
                    <span
                      className={`cart-badge ${
                        cartAnimated ? "item-added" : ""
                      }`}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/login"
                  className="icon-link"
                  aria-label="Iniciar Sesión"
                  onClick={handleLinkClick}
                >
                  <i className="fas fa-user"></i>
                </Link>
              </div>
            </div>

            {/* ENLACES */}
            <li>
              <Link
                to="/acercade"
                className="nav-link"
                onClick={handleLinkClick}
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                to="/categorias"
                className="nav-link"
                onClick={handleLinkClick}
              >
                Catálogo
              </Link>
            </li>
            <li>
              <Link
                to="/ubicacion"
                className="nav-link"
                onClick={handleLinkClick}
              >
                Ubicación
              </Link>
            </li>
            <li>
              <Link
                to="/contactanos"
                className="nav-link"
                onClick={handleLinkClick}
              >
                Contáctanos
              </Link>
            </li>
            <li>
              <a
                href="#footer"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick();
                  document
                    .querySelector("#footer")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Futuro
              </a>
            </li>

            {/* REDES */}
            <div className="mobile-social-media">
              <p className="social-title">Síguenos en:</p>
              <div className="social-icons">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </ul>

          {/* ACCIONES (DESKTOP) */}
          <div className="nav-actions" ref={navActionsRef}>
            <div className="search-container" ref={searchContainerRef}>
              <input
                type="search"
                placeholder="Buscar Libros"
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="search-btn" aria-label="Buscar">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="action-icons">
              <Link
                to="/carrito"
                className={`icon-link ${cartAnimated ? "cart-added" : ""}`}
                aria-label="Carrito"
                onClick={handleLinkClick}
              >
                <i className="fas fa-shopping-cart"></i>
                {cartCount > 0 && (
                  <span
                    className={`cart-badge ${cartAnimated ? "item-added" : ""}`}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/login"
                className="icon-link"
                aria-label="Iniciar Sesión"
                onClick={handleLinkClick}
              >
                <i className="fas fa-user"></i>
              </Link>
            </div>
          </div>

          {/* HAMBURGUESA */}
          <div
            ref={hamburgerRef}
            className={`hamburger ${menuAbierto ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Menú"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
