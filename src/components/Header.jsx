// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { performSearch } from '../assets/js/search';  // Adaptado de search.js

function Header() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      performSearch(searchTerm);  // Llama a la función adaptada
    }
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src="/assets/images/logo.png" alt="SIS" className="logo-imagen" />
              <span className="logo-text">SISTEC</span>
            </Link>
          </div>
          <ul className="nav-menu">
            <li className="nav-item"><Link to="/acerca-de" className="nav-link">Nosotros</Link></li>
            <li className="nav-item"><Link to="/categorias" className="nav-link">Catálogo</Link></li>
            <li className="nav-item"><Link to="/reseñas" className="nav-link">Reseñas</Link></li>
            <li className="nav-item"><Link to="/ubicacion" className="nav-link">Ubicación</Link></li>
            <li className="nav-item"><Link to="/contactanos" className="nav-link">Contacto</Link></li>
            <li className="nav-item"><Link to="/vision" className="nav-link">Futuro</Link></li>  // Enlace a visión o footer
          </ul>
          <div className="nav-actions">
            <div className="search-container">
              <input 
                type="search" 
                placeholder="Buscar Libros" 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearch}
              />
              <button className="search-btn" onClick={handleSearch} aria-label="Buscar">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="action-icons">
              <Link to="#" className="icon-link" aria-label="Carrito">
                <i className="fas fa-shopping-cart"></i>
              </Link>
              <Link to="/login" className="icon-link" aria-label="Iniciar Sesión">
                <i className="fas fa-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;