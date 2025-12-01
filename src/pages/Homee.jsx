import React, { useState, useEffect } from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

const Home = () => {
  const { addToCart } = useCart();
  
  // Estado para los más vendidos desde la BD
  const [masVendidos, setMasVendidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los más vendidos desde la base de datos
  useEffect(() => {
    fetch("/api/libros.php?cat=mas-vendidos")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar más vendidos");
        return res.json();
      })
      .then(data => {
        // Decodificar texto si es necesario (igual que en Categorias.jsx)
        const decoded = data.map(libro => ({
          ...libro,
          descripcion: libro.descripcion?.replace(/\\u([\da-fA-F]{4})/g, (_, hex) => 
            String.fromCharCode(parseInt(hex, 16))
          ) || ""
        }));
        setMasVendidos(decoded);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("No se pudieron cargar los más vendidos");
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
      <main>
        <div className="container">
          {/* === TODAS TUS SECCIONES ANTERIORES QUEDAN IGUAL === */}
          <section className="welcome-section">
            <div className="welcome-content">
              <div className="welcome-image">
                <img
                  src="../assets/Images/fondo-header.jpeg"
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
                <a href="https://empresa-sistec-t5fv.vercel.app/categorias" className="cta-button">
                  Explorar Catálogo
                </a>
              </div>
            </div>
          </section>

          <section className="social-media-section">
            <div className="container">
              <div className="social-content">
                <h2 className="social-title">#NosGustaContarHistorias</h2>
                <div className="social-icons-wrapper">
                  <a href="https://facebook.com" target="_blank" className="social-icon-link" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" className="social-icon-link" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" className="social-icon-link" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://youtube.com" target="_blank" className="social-icon-link" aria-label="YouTube">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <CategoryCarousel />

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

        {/* SECCIÓN MÁS VENDIDOS AHORA USA LA BASE DE DATOS */}
        <section className="bestsellers-section">
          <div className="container">
            <h2 className="section-title-home">Los Más Vendidos</h2>
            <p className="bestsellers-subtitle">
              Los libros favoritos de nuestros lectores
            </p>

            {isLoading ? (
              <p style={{ textAlign: "center", padding: "40px" }}>
                <i className="fas fa-spinner fa-spin"></i> Cargando más vendidos...
              </p>
            ) : error ? (
              <p style={{ textAlign: "center", color: "#e74c3c" }}>{error}</p>
            ) : masVendidos.length === 0 ? (
              <p style={{ textAlign: "center" }}>No hay libros destacados aún.</p>
            ) : (
              <div className="bestsellers-grid">
                {masVendidos.slice(0, 6).map((libro) => (
                  <div key={libro.id} className="bestseller-card">
                    <div className="bestseller-badge">Más Vendido</div>
                    <div className="bestseller-image-container">
                      <img
                        src={libro.imagen}
                        alt={libro.titulo}
                        className="bestseller-img"
                      />
                    </div>
                    <div className="bestseller-info">
                      <h3 className="bestseller-title">{libro.titulo}</h3>
                      <p className="bestseller-author">{libro.autor}</p>
                      <p className="bestseller-category">
                        {libro.categoria || "Categoría"}
                      </p>
                      <div className="bestseller-rating">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                      <p className="bestseller-price">
                        ${parseFloat(libro.precio).toFixed(2)} MXN
                      </p>

                      <button
                        className="btn-add-cart-home"
                        onClick={() => addToCart({ ...libro, cantidad: 1 })}
                      >
                        <i className="fas fa-cart-plus"></i> Añadir al Carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bestsellers-cta">
              <a href="https://empresa-sistec-t5fv.vercel.app/categorias" className="btn-ver-mas">
                Ver Catálogo Completo
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;