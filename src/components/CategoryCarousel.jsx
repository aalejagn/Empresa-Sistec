import React, { useState, useEffect } from 'react';
import '../assets/css/catalago.css';

const CategoryCarousel = () => {
  const categorias = [
    {
      nombre: 'Literatura Contemporánea',
      descripcion: 'Novelas modernas y actuales que reflejan nuestra época',
      count: '4 libros',
      link: '../pages/categorias.html#literatura-contemporanea',
      imagen: 'https://tse1.mm.bing.net/th/id/OIP.RrGvlYUT4Ur97-m8XTk1vAHaLJ?rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      nombre: 'Literatura Histórica',
      descripcion: 'Historias ambientadas en períodos históricos fascinantes',
      count: '5 libros',
      link: '../pages/categorias.html#literatura-historica',
      imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51udpdbi6mL.jpg?v=1745604319&width=990',
    },
    {
      nombre: 'Ficción Afroamericana',
      descripcion: 'Voces poderosas de la experiencia afroamericana',
      count: '3 libros',
      link: '../pages/categorias.html#ficcion-afroamericana',
      imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51gSloBtq0L.jpg?v=1736148004&width=990',
    },
    {
      nombre: 'Novelas Gráficas',
      descripcion: 'Arte y narrativa fusionados en historias visuales',
      count: '3 libros',
      link: '../pages/categorias.html#novelas-graficas',
      imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51boHj8x7vL_fc22898b-f15b-454c-90cd-628053e43afb.jpg?v=1736145118&width=990',
    },
    {
      nombre: 'Ficción Internacional',
      descripcion: 'Clásicos y literatura traducida del mundo entero',
      count: '2 libros',
      link: '../pages/categorias.html#ficcion-internacional',
      imagen: 'https://shop.mtwyouth.org/cdn/shop/files/4174AJ-RtVL.jpg?v=1747058448&width=990',
    },
    {
      nombre: 'Ciencia Ficción y Fantasía',
      descripcion: 'Mundos imaginarios y futuros posibles',
      count: '3 libros',
      link: '../pages/categorias.html#ciencia-ficcion',
      imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51YYB09ZfYL.jpg?v=1740535456&width=990',
    },
    {
      nombre: 'Libros Infantiles',
      descripcion: 'Aventuras y aprendizaje para los más pequeños',
      count: '8 libros',
      link: '../pages/categorias.html#infantiles-juveniles',
      imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51zrujY2oaL.jpg?v=1751492717&width=990',
    },
    {
      nombre: 'No Ficción',
      descripcion: 'Conocimiento real y desarrollo personal',
      count: '6 libros',
      link: '../pages/categorias.html#no-ficcion',
      imagen: 'https://shop.mtwyouth.org/cdn/shop/files/41yQYmGoutL.jpg?v=1744408410&width=990',
    },
    {
      nombre: 'Filosofía y Religión',
      descripcion: 'Reflexiones profundas sobre la vida y la espiritualidad',
      count: '2 libros',
      link: '../pages/categorias.html#filosofia-religion',
      imagen: 'https://shop.mtwyouth.org/cdn/shop/files/41iLX5vhBgL.jpg?v=1736166207&width=990',
    },
    {
      nombre: 'Cine y Artes',
      descripcion: 'El arte del cinematógrafo y las artes visuales',
      count: '2 libros',
      link: '../pages/categorias.html#cine-artes',
      imagen: 'https://shop.mtwyouth.org/cdn/shop/files/51ml1LiKDCL.jpg?v=1749750558&width=990',
    },
    {
      nombre: 'Misterio y Thriller',
      descripcion: 'Suspense y emociones al límite',
      count: '1 libro',
      link: '../pages/categorias.html#misterio-thriller',
      imagen: 'https://shop.mtwyouth.org/cdn/shop/files/411S3xdv-tL.jpg?v=1741812754&width=990',
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

