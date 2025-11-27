// src/pages/Categorias.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { useSearch } from "../components/SearchContext";

// Importa tus CSS aquí (ajusta la ruta si es necesario)
import "../assets/css/catalago.css";
import "../assets/css/style.css";

const Categorias = () => {
  const [categoriaActual, setCategoriaActual] = useState(
    "literatura-contemporanea"
  );
  const [libros, setLibros] = useState([]);
  const [todosLosLibros, setTodosLosLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [libroExpandido, setLibroExpandido] = useState(null);

  const { addToCart } = useCart();
  const { searchTerm } = useSearch();

  // Categorías reales de tu SQL
  const categorias = [
    { key: "mas-vendidos", nombre: "Más Vendidos", icon: "fa-fire" },
    {
      key: "literatura-contemporanea",
      nombre: "Literatura Contemporánea",
      icon: "fa-book",
    },
    {
      key: "literatura-historica",
      nombre: "Literatura Histórica",
      icon: "fa-landmark",
    },
    {
      key: "ficcion-afroamericana",
      nombre: "Ficción Afroamericana",
      icon: "fa-book-reader",
    },
    {
      key: "novelas-graficas",
      nombre: "Novelas Gráficas y Cómics",
      icon: "fa-palette",
    },
    {
      key: "ficcion-internacional",
      nombre: "Ficción Literaria Internacional",
      icon: "fa-globe",
    },
    {
      key: "ciencia-ficcion",
      nombre: "Ciencia Ficción y Fantasía",
      icon: "fa-rocket",
    },
    {
      key: "infantiles-juveniles",
      nombre: "Libros Infantiles y Juveniles",
      icon: "fa-child",
    },
    {
      key: "no-ficcion",
      nombre: "No Ficción y Desarrollo Personal",
      icon: "fa-graduation-cap",
    },
    {
      key: "filosofia-religion",
      nombre: "Filosofía y Religión",
      icon: "fa-om",
    },
    { key: "cine-artes", nombre: "Cine y Artes", icon: "fa-film" },
    {
      key: "misterio-thriller",
      nombre: "Misterio y Thriller",
      icon: "fa-mask",
    },
  ];

  // Función para decodificar Unicode
  const decodeUnicode = (text) => {
    if (!text) return text;
    return text.replace(/\\u([\da-fA-F]{4})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
  };

  // Fetch libros por categoría
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setLibroExpandido(null);
    
    fetch(`/api/libros.php?cat=${categoriaActual}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const decodedData = data.map((libro) => ({
          ...libro,
          descripcion: decodeUnicode(libro.descripcion),
          encuadernacion: decodeUnicode(libro.encuadernacion),
        }));
        setLibros(decodedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching libros:", err);
        setError("No se pudieron cargar los libros. Verifica el servidor.");
        setIsLoading(false);
      });
  }, [categoriaActual]);

  // Cargar TODOS los libros al montar (para búsqueda global)
  useEffect(() => {
    fetch(`/public_html/backend/api/libros.php`)
      .then((res) => res.json())
      .then((data) => {
        const decodedData = data.map((libro) => ({
          ...libro,
          descripcion: decodeUnicode(libro.descripcion),
          encuadernacion: decodeUnicode(libro.encuadernacion),
        }));
        setTodosLosLibros(decodedData);
      })
      .catch((err) => console.error("Error cargando todos los libros:", err));
  }, []);

  // Filtrar libros según el término de búsqueda
  const librosFiltrados = searchTerm.trim() === ""
    ? libros
    : todosLosLibros.filter((libro) =>
        libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        libro.autor.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const toggleExpand = (id) => {
    setLibroExpandido(libroExpandido === id ? null : id);
  };

  return (
    <>
      <Header />
      <main className="catalogo-main">
        <div className="catalogo-container">
          <h1 className="page-title">Catálogo de Libros</h1>

          <div className="content-wrapper">
            {/* Contenido principal (izquierda) */}
            <div className="libros-content">
              {searchTerm.trim() !== "" ? (
                <h2 className="categoria-titulo-actual">
                  <i className="fas fa-search"></i>
                  Resultados para: "{searchTerm}"
                  <span className="resultados-count">
                    ({librosFiltrados.length} {librosFiltrados.length === 1 ? 'resultado' : 'resultados'})
                  </span>
                </h2>
              ) : (
                <h2 className="categoria-titulo-actual">
                  <i
                    className={`fas ${
                      categorias.find((c) => c.key === categoriaActual)?.icon ||
                      "fa-book"
                    }`}
                  ></i>
                  {categorias.find((c) => c.key === categoriaActual)?.nombre ||
                    "Categoría"}
                </h2>
              )}

              {isLoading && searchTerm.trim() === "" ? (
                <div className="loading">
                  <i className="fas fa-spinner"></i> Cargando libros...
                </div>
              ) : error ? (
                <div className="no-books-message">
                  <i className="fas fa-exclamation-circle"></i>
                  <p>{error}</p>
                </div>
              ) : librosFiltrados.length === 0 ? (
                <div className="no-books-message">
                  <i className="fas fa-book-open"></i>
                  <p>
                    {searchTerm.trim() !== ""
                      ? `No se encontraron libros para "${searchTerm}"`
                      : "No hay libros en esta categoría."}
                  </p>
                </div>
              ) : (
                librosFiltrados.map((libro) => (
                  <div
                    key={libro.id}
                    className={`libro-card-compacto ${
                      libroExpandido === libro.id ? "active" : ""
                    }`}
                  >
                    {/* HEADER - Clickeable para expandir */}
                    <div
                      className="libro-header"
                      onClick={() => toggleExpand(libro.id)}
                    >
                      <img
                        src={libro.imagen}
                        alt={libro.titulo}
                        className="libro-imagen-compacta"
                      />
                      <div className="libro-info-compacta">
                        <h3 className="libro-titulo-compacto">
                          {libro.titulo}
                        </h3>
                        <p className="libro-autor-compacto">
                          Autor: {libro.autor}
                        </p>

                        <div className="libro-detalles-compactos">
                          <p>
                            <i className="fas fa-calendar-alt"></i>{" "}
                            {libro.publicado}
                          </p>
                          {libro.encuadernacion && (
                            <p>
                              <i className="fas fa-book"></i>{" "}
                              {libro.encuadernacion}
                            </p>
                          )}
                        </div>

                        <p className="libro-precio-compacto">
                          ${parseFloat(libro.precio).toFixed(2)} USD
                        </p>
                      </div>

                      {/* Ícono toggle */}
                      <div className="toggle-icon">
                        <i
                          className={`fas ${
                            libroExpandido === libro.id
                              ? "fa-chevron-up"
                              : "fa-chevron-down"
                          }`}
                        ></i>
                      </div>
                    </div>

                    {/* DESCRIPCIÓN EXPANDIBLE */}
                    <div className="libro-descripcion-expandible">
                      <div className="libro-descripcion-texto">
                        <p>{libro.descripcion}</p>
                        {libro.editorial && (
                          <p>
                            <strong>Editorial:</strong> {libro.editorial}
                          </p>
                        )}
                        <button
                          className="btn-add-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(libro);
                          }}
                        >
                          <i className="fas fa-cart-plus"></i> Añadir al Carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar a la DERECHA */}
            <aside className="sidebar-categorias">
              <div className="sidebar-section">
                <ul className="categoria-list">
                  <li
                    className={`bestseller-item ${
                      categoriaActual === "mas-vendidos" ? "active" : ""
                    }`}
                    onClick={() => setCategoriaActual("mas-vendidos")}
                  >
                    <i className="fas fa-fire"></i>
                    <span>Más Vendidos</span>
                  </li>
                </ul>
              </div>
              <div className="sidebar-section">
                <h3 className="sidebar-title">
                  <i className="fas fa-list"></i>
                  Categorías
                </h3>
                <ul className="categoria-list">
                  {categorias.slice(1).map((cat) => (
                    <li
                      key={cat.key}
                      className={`categoria-item ${
                        categoriaActual === cat.key ? "active" : ""
                      }`}
                      onClick={() => setCategoriaActual(cat.key)}
                    >
                      <i className={`fas ${cat.icon}`}></i>
                      <span>{cat.nombre}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Categorias;