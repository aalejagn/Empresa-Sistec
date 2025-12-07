// src/pages/Categorias.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { useSearch } from "../components/SearchContext";

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

  const decodeUnicode = (text) => {
    if (!text) return text;
    return text.replace(/\\u([\da-fA-F]{4})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
  };

  // CARGA DE LIBROS (AQUÍ ESTÁ EL CAMBIO CLAVE)
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setLibroExpandido(null);

    let url = `/api/libros.php?cat=${categoriaActual}`;

    // SI ES "MÁS VENDIDOS" → USA EL ENDPOINT ESPECIAL
    if (categoriaActual === "mas-vendidos") {
      url = "/api/mas_vendidos.php?cat=mas-vendidos";
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const decodedData = data.map((libro) => ({
          ...libro,
          titulo: decodeUnicode(libro.titulo || ""),
          autor: decodeUnicode(libro.autor || ""),
          descripcion: decodeUnicode(libro.descripcion || ""),
          encuadernacion: decodeUnicode(libro.encuadernacion || ""),
          editorial: decodeUnicode(libro.editorial || ""),
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
    fetch(`/api/libros.php?cat=literatura-contemporanea`)
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

  const librosFiltrados =
    searchTerm.trim() === ""
      ? libros
      : todosLosLibros.filter(
          (libro) =>
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
            {/* Contenido principal */}
            <div className="libros-content">
              {searchTerm.trim() !== "" ? (
                <h2 className="categoria-titulo-actual">
                  Resultados para: "{searchTerm}"
                  <span className="resultados-count">
                    ({librosFiltrados.length}{" "}
                    {librosFiltrados.length === 1 ? "resultado" : "resultados"})
                  </span>
                </h2>
              ) : (
                <h2 className="categoria-titulo-actual">
                  <i
                    className={`fas ${
                      categoriaActual === "mas-vendidos"
                        ? "fa-fire"
                        : categorias.find((c) => c.key === categoriaActual)?.icon || "fa-book"
                    }`}
                  ></i>
                  {categoriaActual === "mas-vendidos"
                    ? "Más Vendidos"
                    : categorias.find((c) => c.key === categoriaActual)?.nombre || "Categoría"}
                </h2>
              )}

              {isLoading && searchTerm.trim() === "" ? (
                <div className="loading">
                  Cargando libros...
                </div>
              ) : error ? (
                <div className="no-books-message">
                  <p>{error}</p>
                </div>
              ) : librosFiltrados.length === 0 ? (
                <div className="no-books-message">
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
                            {libro.publicado}
                          </p>
                          {libro.encuadernacion && (
                            <p>
                              {libro.encuadernacion}
                            </p>
                          )}
                        </div>

                        <p className="libro-precio-compacto">
                          ${parseFloat(libro.precio).toFixed(2)} MXN
                        </p>
                      </div>

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
                            addToCart({ ...libro, cantidad: 1 });
                          }}
                        >
                          Añadir al Carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar */}
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
                    Más Vendidos
                  </li>
                </ul>
              </div>
              <div className="sidebar-section">
                <h3 className="sidebar-title">
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