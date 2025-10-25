import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { librosData, titulosCategorias, iconosCategorias } from '../assets/js/categorias-data';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';

function Categorias() {
  const [categoriaActual, setCategoriaActual] = useState('literatura-contemporanea');
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    // Cargar libros de la categoría actual
    setLibros(librosData[categoriaActual] || []);

    // Agregar event listeners para los headers de las tarjetas
    const headers = document.querySelectorAll('.libro-header');
    headers.forEach(header => {
      header.addEventListener('click', function() {
        const card = this.parentElement;
        card.classList.toggle('active');
      });
    });

    // Scroll al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Limpiar event listeners al desmontar
    return () => {
      headers.forEach(header => header.removeEventListener('click', () => {}));
    };
  }, [categoriaActual]);

  const handleCategoria = (categoria) => {
    setCategoriaActual(categoria);
    // Remover clase active de todos los items
    document.querySelectorAll('.categoria-item, .bestseller-item').forEach(item => item.classList.remove('active'));
    // Agregar clase active al item seleccionado
    const selectedItem = document.querySelector(`[data-categoria="${categoria}"], .bestseller-item[data-categoria="${categoria}"]`);
    if (selectedItem) selectedItem.classList.add('active');
  };

  return (
    <div>
      <Header />
      <main className="catalogo-main">
        <div className="catalogo-container">
          <h1 className="page-title">Catálogo de Libros</h1>
          <div className="content-wrapper">
            <section className="libros-content" id="libros-content">
              <h2 className="categoria-titulo-actual">
                <i className={`fas ${iconosCategorias[categoriaActual]}`}></i>
                {titulosCategorias[categoriaActual]}
              </h2>
              {libros.length > 0 ? (
                libros.map((libro, index) => (
                  <div key={libro.titulo || index} className="libro-card-compacto">
                    <div className="libro-header">
                      <img src={libro.imagen} alt={libro.titulo} className="libro-imagen-compacta" />
                      <div className="libro-info-compacta">
                        <h3 className="libro-titulo-compacto">{libro.titulo}</h3>
                        <p className="libro-autor-compacto"><strong>Autor:</strong> {libro.autor}</p>
                        <div className="libro-detalles-compactos">
                          {libro.publicado && <p><i className="far fa-calendar"></i> {libro.publicado}</p>}
                          {libro.editorial && <p><i className="fas fa-building"></i> {libro.editorial}</p>}
                          {libro.encuadernacion && <p><i className="fas fa-book-open"></i> {libro.encuadernacion}</p>}
                        </div>
                        <p className="libro-precio-compacto">{libro.precio}</p>
                      </div>
                      <i className="fas fa-chevron-down toggle-icon"></i>
                    </div>
                    <div className="libro-descripcion-expandible">
                      <p className="libro-descripcion-texto">{libro.descripcion}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-books-message">No hay libros en esta categoría.</p>
              )}
            </section>
            <aside className="sidebar-categorias">
              <div className="sidebar-section">
                <h3 className="sidebar-title"><i className="fas fa-fire"></i> Más Vendidos</h3>
                <ul className="categoria-list">
                  <li
                    className={`bestseller-item ${categoriaActual === 'mas-vendidos' ? 'active' : ''}`}
                    data-categoria="mas-vendidos"
                    onClick={() => handleCategoria('mas-vendidos')}
                  >
                    Top Ventas
                  </li>
                </ul>
              </div>
              <div className="sidebar-section">
                <h3 className="sidebar-title"><i className="fas fa-bookmark"></i> Categorías</h3>
                <ul className="categoria-list">
                  {Object.keys(titulosCategorias)
                    .filter(cat => cat !== 'mas-vendidos')
                    .map(categoria => (
                      <li
                        key={categoria}
                        className={`categoria-item ${categoriaActual === categoria ? 'active' : ''}`}
                        data-categoria={categoria}
                        onClick={() => handleCategoria(categoria)}
                      >
                        {titulosCategorias[categoria]}
                      </li>
                    ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Categorias;