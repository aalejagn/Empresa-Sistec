// src/pages/Reseñas.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';


function Reseñas() {
  const [reseñas, setReseñas] = useState([]);
  const [nuevaReseña, setNuevaReseña] = useState('');

  const agregarReseña = () => {
    if (nuevaReseña.trim()) {
      setReseñas([...reseñas, nuevaReseña]);
      setNuevaReseña('');
    }
  };

  return (
    <div>
      <Header />
      <main className="container">
        <h1 className="page-title">Reseñas</h1>
        <section className="about-section">
          <article>
            <h2>Opiniones de nuestros clientes</h2>
            <ul>
              {reseñas.map((reseña, index) => (
                <li key={index}>{reseña}</li>
              ))}
            </ul>
            <input
              type="text"
              value={nuevaReseña}
              onChange={(e) => setNuevaReseña(e.target.value)}
              placeholder="Escribe tu reseña"
              style={{ padding: '0.5rem', marginRight: '1rem' }}
            />
            <button onClick={agregarReseña} className="btn btn-primary">
              Agregar Reseña
            </button>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Reseñas;