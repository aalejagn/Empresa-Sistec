import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/CategoryCarousel.css';

const CategoryCarousel = () => {
  const categorias = [
    {
      nombre: 'Literatura Contemporánea',
      descripcion: 'Novelas modernas y actuales que reflejan nuestra época',
      count: '4 libros',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226215/OIP_ezeg1e.webp',
    },
    {
      nombre: 'Literatura Histórica',
      descripcion: 'Historias ambientadas en períodos históricos fascinantes',
      count: '5 libros',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226234/51udpdbi6mL_yfnanf.webp',
    },
    {
      nombre: 'Ficción Afroamericana',
      descripcion: 'Voces poderosas de la experiencia afroamericana',
      count: '3 libros',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226241/51gSloBtq0L_warrqx.jpg',
    },
    {
      nombre: 'Novelas Gráficas',
      descripcion: 'Arte y narrativa fusionados en historias visuales',
      count: '3 libros',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226247/51boHj8x7vL_fc22898b-f15b-454c-90cd-628053e43afb_ob8fir.jpg',
    },
    {
      nombre: 'Ficción Internacional',
      descripcion: 'Clásicos y literatura traducida del mundo entero',
      count: '2 libros',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226253/4174AJ-RtVL_siuou7.jpg',
    },
    {
      nombre: 'Ciencia Ficción y Fantasía',
      descripcion: 'Mundos imaginarios y futuros posibles',
      count: '3 libros',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226259/51YYB09ZfYL_eshzf9.jpg',
    },
    {
      nombre: 'Libros Infantiles',
      descripcion: 'Aventuras y aprendizaje para los más pequeños',
      count: '8 libros',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226268/51zrujY2oaL_bekpej.jpg',
    },
    {
      nombre: 'No Ficción',
      descripcion: 'Conocimiento real y desarrollo personal',
      count: '6 libros',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226286/41yQYmGoutL_ackgzo.webp',
    },
    {
      nombre: 'Filosofía y Religión',
      descripcion: 'Reflexiones profundas sobre la vida y la espiritualidad',
      count: '2 libros',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226292/41iLX5vhBgL_r4fjyw.jpg',
    },
    {
      nombre: 'Cine y Artes',
      descripcion: 'El arte del cinematógrafo y las artes visuales',
      count: '2 libros',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226304/51ml1LiKDCL_fbvsvn.webp',
    },
    {
      nombre: 'Misterio y Thriller',
      descripcion: 'Suspense y emociones al límite',
      count: '1 libro',
      link: 'https://sistec-read.vercel.app/categorias',
      imagen: 'https://res.cloudinary.com/dfcaljjed/image/upload/v1762226311/411S3xdv-tL_elnegc.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);
  const carouselRef = useRef(null);

  const getCardsPerView = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 4;
  };

  // Duplicar las categorías para crear el efecto infinito
  const extendedCategorias = [...categorias, ...categorias, ...categorias];

  const moveCarousel = (direction) => {
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => prevIndex + direction);
  };

  useEffect(() => {
    const cardsPerView = getCardsPerView();
    
    // Resetear posición cuando llegue al final o inicio de las copias
    if (currentIndex >= categorias.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(categorias.length);
      }, 400);
    } else if (currentIndex <= 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(categorias.length);
      }, 400);
    }
  }, [currentIndex, categorias.length]);

  // Auto-play
  const startAutoPlay = () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    const interval = setInterval(() => {
      moveCarousel(1);
    }, 5000);
    setAutoPlayInterval(interval);
  };

  const pauseAutoPlay = () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  };

  useEffect(() => {
    // Iniciar en el medio del array (primer set de categorías reales)
    setIsTransitioning(false);
    setCurrentIndex(categorias.length);
    
    setTimeout(() => {
      setIsTransitioning(true);
      startAutoPlay();
    }, 50);

    const handleResize = () => {
      setIsTransitioning(false);
      setCurrentIndex(categorias.length);
      setTimeout(() => setIsTransitioning(true), 50);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cardsPerView = getCardsPerView();
  const cardWidth = 100 / cardsPerView;
  const offset = currentIndex * cardWidth;

  return (
    <section className="categorias-home" id="categorias">
      <h2>Buscar por Tema</h2>
      
      <div 
        className="categorias-carousel-wrapper" 
        onMouseEnter={pauseAutoPlay} 
        onMouseLeave={startAutoPlay}
      >
        <button 
          className="carousel-btn carousel-btn-prev" 
          onClick={() => moveCarousel(-1)}
        >
          ‹
        </button>
        
        <div 
          ref={carouselRef}
          className="categorias-grid" 
          style={{ 
            transform: `translateX(-${offset}%)`, 
            transition: isTransitioning ? 'transform 0.4s ease-in-out' : 'none'
          }}
        >
          {extendedCategorias.map((cat, index) => (
            <div 
              key={`${cat.nombre}-${index}`}
              className="categoria-card" 
              style={{ flex: `0 0 calc(${cardWidth}% - 1.5rem)`, minWidth: `calc(${cardWidth}% - 1.5rem)` }}
            >
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
        
        <button 
          className="carousel-btn carousel-btn-next" 
          onClick={() => moveCarousel(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default CategoryCarousel;