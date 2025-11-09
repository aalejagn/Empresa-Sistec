import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/header.css";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const hamburgerRef = useRef(null);
  const navMenuRef = useRef(null);
  const searchContainerRef = useRef(null);
  const logoRef = useRef(null);
  const navActionsRef = useRef(null);

  const location = useLocation();

  // === CERRAR MENÚ AL CAMBIAR DE PÁGINA ===
  useEffect(() => {
    // Cerrar menú
    setMenuAbierto(false);
    document.body.style.overflow = "";
    // Eliminamos scrollTo, lo maneja ScrollRestoration en App.jsx
    window.scrollTo(0,0);
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
    // Eliminamos scrollTo, lo maneja ScrollRestoration
  };

  // === LIMPIEZA AL DESMONTAR ===
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="nav-container">
          {/* LOGO */}
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
            <div className="mobile-menu-header">
              <button
                id="closeMenu"
                className="close-btn"
                onClick={closeMenu}
                aria-label="Cerrar menú"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="mobile-login">
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

            <li>
              <Link to="/acercade" className="nav-link" onClick={handleLinkClick}>
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/categorias" className="nav-link" onClick={handleLinkClick}>
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/ubicacion" className="nav-link" onClick={handleLinkClick}>
                Ubicación
              </Link>
            </li>
            <li>
              <Link to="/contactanos" className="nav-link" onClick={handleLinkClick}>
                Contáctanos
              </Link>
            </li>
            <li>
              <a href="#footer" className="nav-link" onClick={(e) => {
                e.preventDefault();
                handleLinkClick();
                document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Futuro
              </a>
            </li>

            <div className="mobile-social-media">
              <p className="social-title">Síguenos en:</p>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </ul>

          {/* ACCIONES */}
          <div className="nav-actions" ref={navActionsRef}>
            <div className="search-container" ref={searchContainerRef}>
              <input
                type="search"
                placeholder="Buscar Libros"
                className="search-input"
              />
              <button className="search-btn" aria-label="Buscar">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="action-icons">
              <Link to="/carrito" className="icon-link" aria-label="Carrito" onClick={handleLinkClick}>
                <i className="fas fa-shopping-cart"></i>
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
            onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
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