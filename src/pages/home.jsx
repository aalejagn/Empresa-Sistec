import React from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import "../assets/css/style.css";
import "../assets/css/header.css";
import "../assets/css/footer.css";
import "../assets/css/catalago.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Encabezado */}
      <header className="main-header">
        <nav className="main-nav">
          <div className="nav-container">
            <div className="logo">
              <a href="/" className="logo-link">
                <img
                  src="/assets/Images/logo.png"
                  alt="SIS"
                  className="logo-imagen"
                />
                <span className="logo-text">SISTEC</span>
              </a>
            </div>
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="/src/pages/acerca_de.html" className="nav-link">
                  Nosotros
                </a>
              </li>
              <li className="nav-item">
                <a href="/src/pages/categorias.html" className="nav-link">
                  Catálogo
                </a>
              </li>
              <li className="nav-item">
                <a href="/src/pages/reseñas.html" className="nav-link">
                  Reseñas
                </a>
              </li>
              <li className="nav-item">
                <a href="/src/pages/ubicacion.html" className="nav-link">
                  Ubicación
                </a>
              </li>
              <li className="nav-item">
                <a href="/src/pages/contactanos.html" className="nav-link">
                  Contacto
                </a>
              </li>
              <li className="nav-item">
                <a href="#footer" className="nav-link">
                  Futuro
                </a>
              </li>
            </ul>
            <div className="nav-actions">
              <div className="search-container">
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
                <a href="#" className="icon-link" aria-label="Carrito">
                  <i className="fas fa-shopping-cart"></i>
                </a>
                  <Link to="/login" className="icon-link" aria-label="Iniciar Sesión">
                  <i className="fas fa-user"></i>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="container">
          {/* Sección de bienvenida */}
          <section className="welcome-section">
            <div className="welcome-content">
              <div className="welcome-image">
                <img
                  src="/assets/Images/fondo-header.jpeg"
                  alt="Imagen de bienvenida"
                  className="hero-image"
                />
              </div>
              <div className="welcome-text">
                <h1 className="welcome-title">
                  Bienvenido a nuestro catálogo online
                </h1>
                <p className="welcome-description">
                  Descubre un mundo de conocimiento y aventuras a través de
                  nuestra extensa colección de libros. Desde clásicos
                  atemporales hasta las últimas novedades, tenemos algo especial
                  para cada tipo de lector. Explora nuestras categorías
                  cuidadosamente organizadas y encuentra tu próxima gran
                  lectura.
                </p>
                <a href="/categorias" className="cta-button">
                  Explorar Catálogo
                </a>
              </div>
            </div>
          </section>

          {/* Sección de redes sociales */}
          <section className="social-media-section">
            <div className="container">
              <div className="social-content">
                <h2 className="social-title">#NosGustaContarHistorias</h2>
                <div className="social-icons-wrapper">
                  <a
                    href="https://facebook.com/tupage"
                    target="_blank"
                    className="social-icon-link"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://twitter.com/tupage"
                    target="_blank"
                    className="social-icon-link"
                    aria-label="Twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="https://instagram.com/tupage"
                    target="_blank"
                    className="social-icon-link"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://youtube.com/tucanal"
                    target="_blank"
                    className="social-icon-link"
                    aria-label="YouTube"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Carrusel dinámico */}
          <CategoryCarousel />

          {/* Sección de estadísticas */}
          <section className="stats-section">
            <div className="stats-container">
              <div className="stat-item">
                <h3 className="stat-number">40+</h3>
                <p className="stat-label">Libros Disponibles</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number">11</h3>
                <p className="stat-label">Categorías</p>
              </div>
              <div className="stat-item">
                <h3 className="stat-number">100%</h3>
                <p className="stat-label">Digital</p>
              </div>
            </div>
          </section>
        </div>
        {/* Sección de más vendidos */}
        <section className="bestsellers-section">
          <div className="container">
            <h2 className="section-title">Los Más Vendidos</h2>
            <p className="bestsellers-subtitle">
              Los libros favoritos de nuestros lectores
            </p>
            <div className="bestsellers-grid">
              <div className="bestseller-card">
                <div className="bestseller-badge">Más Vendido</div>
                <div className="bestseller-image-container">
                  <img
                    src="https://shop.mtwyouth.org/cdn/shop/files/61_KbxrnHxL.jpg?v=1736152142&width=990"
                    alt="Sus ojos miraban a Dios"
                    className="bestseller-img"
                  />
                </div>
                <div className="bestseller-info">
                  <h3 className="bestseller-title">Sus ojos miraban a Dios</h3>
                  <p className="bestseller-author">Zora Neale Hurston</p>
                  <p className="bestseller-category">
                    Literatura Contemporánea
                  </p>
                  <div className="bestseller-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="bestseller-price">$17.99 USD</p>
                </div>
              </div>
              {/*Libro 2:El diario de una niña*/}
              <div className="bestseller-card">
                <div className="bestseller-badge">Mas Vendido</div>
                <div className="bestseller-image-container">
                  <img
                    src="https://shop.mtwyouth.org/cdn/shop/files/51DvoRaqkvL.jpg?v=1741801884&width=990"
                    alt="El diario de una niña"
                    className="bestseller-img"
                  />
                </div>
                <div class="bestseller-info">
                  <h3 class="bestseller-title">El diario de una niña</h3>
                  <p class="bestseller-author">Ana Frank</p>
                  <p class="bestseller-category">Literatura Histórica</p>
                  <div class="bestseller-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <p class="bestseller-price">$8.99 USD</p>
                </div>
              </div>
              {/*Libro 3:Crimen y castigo*/}
              <div class="bestseller-card">
                <div class="bestseller-badge">Mas Vendido</div>
                <div class="bestseller-image-container">
                  <img
                    src="https://shop.mtwyouth.org/cdn/shop/files/51X8dkqlDdL.jpg?v=1754762058&width=990"
                    alt="Crimen y castigo"
                    class="bestseller-img"
                  />
                </div>
                <div class="bestseller-info">
                  <h3 class="bestseller-title">Crimen y castigo</h3>
                  <p class="bestseller-author">Fiódor Dostoievski</p>
                  <p class="bestseller-category">Ficción Internacional</p>
                  <div class="bestseller-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <p class="bestseller-price">$22.00 USD</p>
                </div>
              </div>
              {/*Libro 4:Nimona*/}
              <div class="bestseller-card">
                <div class="bestseller-badge">Mas Vendido</div>
                <div class="bestseller-image-container">
                  <img
                    src="https://shop.mtwyouth.org/cdn/shop/files/51boHj8x7vL_fc22898b-f15b-454c-90cd-628053e43afb.jpg?v=1736145118&width=990"
                    alt="Nimona"
                    class="bestseller-img"
                  />
                </div>
                <div class="bestseller-info">
                  <h3 class="bestseller-title">Nimona</h3>
                  <p class="bestseller-author">Noelle Stevenson</p>
                  <p class="bestseller-category">Novelas Gráficas</p>
                  <div class="bestseller-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                  <p class="bestseller-price">$18.99 USD</p>
                </div>
              </div>
              {/*Libro 5:Semilla Silvestre*/}
              <div class="bestseller-card">
                <div class="bestseller-badge">Mas Vendido</div>
                <div class="bestseller-image-container">
                  <img
                    src="https://shop.mtwyouth.org/cdn/shop/files/51YYB09ZfYL.jpg?v=1740535456&width=990"
                    alt="Semilla silvestre"
                    class="bestseller-img"
                  />
                </div>
                <div class="bestseller-info">
                  <h3 class="bestseller-title">Semilla silvestre</h3>
                  <p class="bestseller-author">Octavia E. Butler</p>
                  <p class="bestseller-category">Ciencia Ficción</p>
                  <div class="bestseller-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                  <p class="bestseller-price">$18.99 USD</p>
                </div>
              </div>
              {/*Libro 5:Potencial Oculto*/}
              <div class="bestseller-card">
                <div class="bestseller-badge">Mas Vendido</div>
                <div class="bestseller-image-container">
                  <img
                    src="https://shop.mtwyouth.org/cdn/shop/files/41yQYmGoutL.jpg?v=1744408410&width=990"
                    alt="Potencial oculto"
                    class="bestseller-img"
                  />
                </div>
                <div class="bestseller-info">
                  <h3 class="bestseller-title">Potencial oculto</h3>
                  <p class="bestseller-author">Adam Grant</p>
                  <p class="bestseller-category">No Ficción</p>
                  <div class="bestseller-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                  <p class="bestseller-price">$32.00 USD</p>
                </div>
              </div>

              {/* Agrega más bestseller-cards si quieres */}
            </div>
            <div className="bestsellers-cta">
              <a href="/categorias" className="btn-ver-mas">
                Ver Catálogo Completo
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer new-design" id="footer">
        <div className="footer-main-content">
          <p className="main-info-text">
            Mantente conectado con SISTEC READ y recibe novedades exclusivas.
          </p>
        </div>
        <div className="footer-bottom-bar">
          <div className="footer-links-row">
            <p className="copyright-text">
              &copy; 2025 <strong>SISTEC READ</strong>. Todos los derechos
              reservados.
            </p>
            <ul className="legal-links">
              <li>
                <a href="/politicas-privacidad">Políticas de Privacidad</a>
              </li>
              <li>
                <span>|</span>
              </li>
              <li>
                <a href="/terminos-condiciones">Términos y Condiciones</a>
              </li>
              <li>
                <span>|</span>
              </li>
              <li>
                <a href="/politica-devolucion">Política de Devolución</a>
              </li>
            </ul>
          </div>
          <div className="footer-links-row corporate-row">
            <p className="copyright-text">
              Promoviendo la lectura y el conocimiento en nuestra comunidad.
            </p>
            <ul className="corporate-links">
              <li>
                <a href="/mision">Misión</a>
              </li>
              <li>
                <span>|</span>
              </li>
              <li>
                <a href="/vision">Visión</a>
              </li>
              <li>
                <span>|</span>
              </li>
              <li>
                <a href="/valores">Valores</a>
              </li>
            </ul>
          </div>
          <div className="payment-icons"></div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
