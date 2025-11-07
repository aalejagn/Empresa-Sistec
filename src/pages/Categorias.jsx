// src/pages/Categorias.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import "../assets/css/style.css";
import "../assets/css/catalago.css";
import "../assets/css/header.css";
import "../assets/css/footer.css";

const Categorias = () => {
  return (
    <>
      <Header />

      {/* Contenido principal */}
      <main className="catalogo-main">
        <div className="catalogo-container">
          <h1 className="page-title">Catálogo de Libros</h1>

          <div className="content-wrapper">
            {/* Contenido principal de libros */}
            <section className="libros-content" id="libros-content">
              {/* Los libros se cargarán dinámicamente aquí */}
            </section>

            {/* Sidebar lateral derecho */}
            <aside className="sidebar-categorias">
              {/* Más Vendidos */}
              <div className="sidebar-section">
                <h3 className="sidebar-title">
                  <i className="fas fa-fire"></i> Más Vendidos
                </h3>
                <ul className="categoria-list">
                  <li className="bestseller-item" data-categoria="mas-vendidos">
                    <i className="fas fa-star"></i> Top Ventas
                  </li>
                </ul>
              </div>

              {/* Categorías */}
              <div className="sidebar-section">
                <h3 className="sidebar-title">
                  <i className="fas fa-bookmark"></i> Categorías
                </h3>
                <ul className="categoria-list">
                  <li
                    className="categoria-item active"
                    data-categoria="literatura-contemporanea"
                  >
                    <i className="fas fa-book"></i> Literatura Contemporánea
                  </li>
                  <li
                    className="categoria-item"
                    data-categoria="literatura-historica"
                  >
                    <i className="fas fa-landmark"></i> Literatura Histórica
                  </li>
                  <li
                    className="categoria-item"
                    data-categoria="ficcion-afroamericana"
                  >
                    <i className="fas fa-book-reader"></i> Ficción Afroamericana
                  </li>
                  <li className="categoria-item" data-categoria="novelas-graficas">
                    <i className="fas fa-palette"></i> Novelas Gráficas
                  </li>
                  <li
                    className="categoria-item"
                    data-categoria="ficcion-internacional"
                  >
                    <i className="fas fa-globe"></i> Ficción Internacional
                  </li>
                  <li className="categoria-item" data-categoria="ciencia-ficcion">
                    <i className="fas fa-rocket"></i> Ciencia Ficción
                  </li>
                  <li
                    className="categoria-item"
                    data-categoria="infantiles-juveniles"
                  >
                    <i className="fas fa-child"></i> Infantiles y Juveniles
                  </li>
                  <li className="categoria-item" data-categoria="no-ficcion">
                    <i className="fas fa-graduation-cap"></i> No Ficción
                  </li>
                  <li className="categoria-item" data-categoria="filosofia-religion">
                    <i className="fas fa-om"></i> Filosofía y Religión
                  </li>
                  <li className="categoria-item" data-categoria="cine-artes">
                    <i className="fas fa-film"></i> Cine y Artes
                  </li>
                  <li className="categoria-item" data-categoria="misterio-thriller">
                    <i className="fas fa-mask"></i> Misterio y Thriller
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer - Ahora como componente */}
      <Footer />
      
    </>
  );
};

export default Categorias;