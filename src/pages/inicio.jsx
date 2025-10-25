import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { librosData, titulosCategorias } from '../assets/js/categorias-data';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);
  const cards = Object.keys(librosData).map(categoria => ({
    imagen: librosData[categoria][0]?.imagen || 'https://via.placeholder.com/150',
    titulo: titulosCategorias[categoria] || categoria.replace(/-/g, ' ').toUpperCase(),
  }));
  const totalCards = cards.length;
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1200) setCardsPerView(3);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    startAutoPlay();

    return () => {
      window.removeEventListener('resize', updateCardsPerView);
      clearInterval(autoPlayInterval);
    };
  }, []);

  const startAutoPlay = () => {
    clearInterval(autoPlayInterval);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (totalCards - cardsPerView + 1));
    }, 10000);
    setAutoPlayInterval(interval);
  };

  const handleCarouselChange = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = totalCards - cardsPerView;
    if (newIndex > totalCards - cardsPerView) newIndex = 0;
    setCurrentIndex(newIndex);
    startAutoPlay();
  };

  return (
    <div>
      <Header />
      <main className="container">
        <h1 className="page-title">Bienvenido a SISTEC READ</h1>
        <section className="categorias-carousel-wrapper">
          <button className="carousel-btn prev" onClick={() => handleCarouselChange(-1)}>&lt;</button>
          <div className="categorias-grid" style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}>
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <div key={index} className="categoria-card">
                  <img src={card.imagen} alt={card.titulo} className="categoria-imagen" />
                  <h3>{card.titulo}</h3>
                </div>
              ))
            ) : (
              <p>No hay categorías disponibles.</p>
            )}
          </div>
          <button className="carousel-btn next" onClick={() => handleCarouselChange(1)}>&gt;</button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;