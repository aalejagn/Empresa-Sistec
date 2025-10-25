// src/pages/Vision.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';

function Vision() {
  const [mostrarFuturo, setMostrarFuturo] = useState(false);

  return (
    <div>
      <Header />
      <main className="container">
        <h1 className="page-title">Visión</h1>
        <section className="about-section">
          <article>
            <h2 className="vision-titulo">Nuestra Visión</h2>
            <p>Nuestra visión es consolidarnos como la librería de referencia en Chiapas y expandirnos a nivel regional, siendo reconocidos por nuestra oferta y papel en la formación de una comunidad lectora.</p>
            <img src="https://i.pinimg.com/736x/e8/f2/17/e8f2177d41fafd8ce27fe16276001133.jpg" className="libro-vision" alt="Visión de lectura" />
          </article>
          <aside>
            <h3>Nuestro Futuro</h3>
            <p>En SISTEC READ imaginamos un futuro donde la lectura sea parte del día a día. Trabajamos para crear espacios accesibles y fomentar autores locales.</p>
            <button onClick={() => setMostrarFuturo(!mostrarFuturo)} className="btn btn-primary">
              {mostrarFuturo ? 'Ocultar Detalles' : 'Mostrar Más sobre Nuestro Futuro'}
            </button>
            {mostrarFuturo && <p style={{ marginTop: '1rem' }}>En el futuro, expandiremos a sucursales digitales y eventos virtuales.</p>}
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Vision;