import React, { useState, useEffect } from 'react';
import '../assets/css/catalago.css';

const CategoryCarousel = () => {
  const categorias = [
    {
      nombre: 'Literatura Contemporánea',
      descripcion: 'Novelas modernas y actuales que reflejan nuestra época',
      count: '4 libros',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226215/OIP_ezeg1e.webp',
    },
    {
      nombre: 'Literatura Histórica',
      descripcion: 'Historias ambientadas en períodos históricos fascinantes',
      count: '5 libros',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226234/51udpdbi6mL_yfnanf.webp',
    },
    {
      nombre: 'Ficción Afroamericana',
      descripcion: 'Voces poderosas de la experiencia afroamericana',
      count: '3 libros',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226241/51gSloBtq0L_warrqx.jpg',
    },
    {
      nombre: 'Novelas Gráficas',
      descripcion: 'Arte y narrativa fusionados en historias visuales',
      count: '3 libros',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226247/51boHj8x7vL_fc22898b-f15b-454c-90cd-628053e43afb_ob8fir.jpg',
    },
    {
      nombre: 'Ficción Internacional',
      descripcion: 'Clásicos y literatura traducida del mundo entero',
      count: '2 libros',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226253/4174AJ-RtVL_siuou7.jpg',
    },
    {
      nombre: 'Ciencia Ficción y Fantasía',
      descripcion: 'Mundos imaginarios y futuros posibles',
      count: '3 libros',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226259/51YYB09ZfYL_eshzf9.jpg',
    },
    {
      nombre: 'Libros Infantiles',
      descripcion: 'Aventuras y aprendizaje para los más pequeños',
      count: '8 libros',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226268/51zrujY2oaL_bekpej.jpg',
    },
    {
      nombre: 'No Ficción',
      descripcion: 'Conocimiento real y desarrollo personal',
      count: '6 libros',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226286/41yQYmGoutL_ackgzo.webp',
    },
    {
      nombre: 'Filosofía y Religión',
      descripcion: 'Reflexiones profundas sobre la vida y la espiritualidad',
      count: '2 libros',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226292/41iLX5vhBgL_r4fjyw.jpg',
    },
    {
      nombre: 'Cine y Artes',
      descripcion: 'El arte del cinematógrafo y las artes visuales',
      count: '2 libros',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226304/51ml1LiKDCL_fbvsvn.webp',
    },
    {
      nombre: 'Misterio y Thriller',
      descripcion: 'Suspense y emociones al límite',
      count: '1 libro',
      link: '/src/pages/categorias.html',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226311/411S3xdv-tL_elnegc.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  const getCardsPerView = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 4;
  };

  const moveCarousel = (direction) => {
    const cardsPerView = getCardsPerView();
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = categorias.length - cardsPerView;
    } else if (newIndex > categorias.length - cardsPerView) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
    resetAutoPlay();
  };

  const startAutoPlay = () => {
    clearInterval(autoPlayInterval);
    const interval = setInterval(() => {
      moveCarousel(1);
    }, 10000);  // 10 segundos como en el original
    setAutoPlayInterval(interval);
  };

  const resetAutoPlay = () => {
    startAutoPlay();
  };

  const pauseAutoPlay = () => {
    clearInterval(autoPlayInterval);
  };

  useEffect(() => {
    startAutoPlay();
    const handleResize = () => {
      setCurrentIndex(0);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(autoPlayInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cardsPerView = getCardsPerView();
  const cardWidth = (100 / cardsPerView);
  const offset = currentIndex * cardWidth;

  return (
    <section className="categorias-home" id="categorias">
      <h2 className="section-title">Buscar por Tema</h2>
      
      <div 
        className="categorias-carousel-wrapper" 
        onMouseEnter={pauseAutoPlay} 
        onMouseLeave={resetAutoPlay}
      >
        <button className="carousel-btn carousel-btn-prev" onClick={() => moveCarousel(-1)}>‹</button> {/* Usé < y > simples para evitar issues Unicode */}
        
        <div className="categorias-grid" style={{ transform: `translateX(-${offset}%)`, transition: 'transform 0.3s ease' }}>
          {categorias.map((cat, index) => (
            <div key={index} className="categoria-card" style={{ flex: `0 0 calc(${cardWidth}% - 2rem)` }}> {/* Ajuste para gap */}
              <a href={cat.link} className="categoria-link">
                <div className="categoria-image">
                  <img src={cat.imagen} alt={cat.nombre} className="categoria-img" />
                </div>
                <div className="categoria-info">
                  <h3 className="categoria-name">{cat.nombre}</h3>
                  <p className="categoria-desc">{cat.descripcion}</p>
                  <span className="categoria-count">{cat.count}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
        
        <button className="carousel-btn carousel-btn-next" onClick={() => moveCarousel(1)}>›</button>
      </div>
    </section>
  );
};

export default CategoryCarousel;

