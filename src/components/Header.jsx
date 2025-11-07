import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../assets/css/header.css";

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const hamburgerRef = useRef(null);
  const navMenuRef = useRef(null);
  const searchContainerRef = useRef(null);
  const logoRef = useRef(null);
  const navActionsRef = useRef(null);

  // ✅ Abrir/cerrar menú
  const openMenu = () => {
    setMenuAbierto(true);
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    setMenuAbierto(false);
    document.body.style.overflow = "";
  };
  const toggleMenu = () => (menuAbierto ? closeMenu() : openMenu());

  // ✅ Cerrar con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuAbierto) closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuAbierto]);

  // ✅ Reubicar buscador (igual que tu adjustSearchPosition)
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

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) closeMenu();
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="nav-container">
          {/* LOGO PRINCIPAL */}
          <div className="logo" ref={logoRef}>
            <Link to="/" className="logo-link">
              <img
                src="/assets/Images/logo.png"
                alt="SISTEC"
                className="logo-imagen"
              />
              <span className="logo-text">SISTEC READ</span>
            </Link>
          </div>

          {/* MENÚ PRINCIPAL */}
          <ul
            className={`nav-menu ${menuAbierto ? "active" : ""}`}
            ref={navMenuRef}
          >
            {/* Header móvil (logo + íconos) */}
            <div className="mobile-menu-header">
              <Link to="/" className="logo-link">
                <img
                  src="/assets/Images/logo.png"
                  alt="SISTEC"
                  className="logo-imagen"
                />
                <span className="logo-text">SISTEC</span>
              </Link>
              <div className="mobile-menu-icons">
                <Link to="/carrito" className="icon-link" aria-label="Carrito">
                  <i className="fas fa-shopping-cart"></i>
                </Link>
                <Link
                  to="/login"
                  className="icon-link"
                  aria-label="Iniciar Sesión"
                >
                  <i className="fas fa-user"></i>
                </Link>
              </div>
            </div>

            {/* Enlaces */}
            <li>
              <Link to="/acercade" className="nav-link">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/categorias" className="nav-link">
                Catalogo
              </Link>
            </li>
            <li>
              <Link to="/ubicacion" className="nav-link">
                Ubicacion
              </Link>
            </li>
            <li>
            <Link to="/contactanos" className="nav-link">
            Contactanos
            </Link>
            </li>
            <li>
              <a href="#footer" class="nav-link">
                Futuro
              </a>
            </li>

            {/* Redes sociales en móvil */}
            <div className="mobile-social-media">
              <p className="social-title">Síguenos en:</p>
              <div className="social-icons">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </ul>

          {/* ACCIONES (versión escritorio) */}
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
              <Link to="/carrito" className="icon-link" aria-label="Carrito">
                <i className="fas fa-shopping-cart"></i>
              </Link>
              <Link
                to="/login"
                className="icon-link"
                aria-label="Iniciar Sesión"
              >
                <i className="fas fa-user"></i>
              </Link>
            </div>
          </div>

          {/* MENÚ HAMBURGUESA */}
          <div
            ref={hamburgerRef}
            className={`hamburger ${menuAbierto ? "active" : ""}`}
            onClick={toggleMenu}
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
