// src/pages/PoliticasPrivacidad.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/legal-pages.css';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';

function PoliticasPrivacidad() {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  return (
    <div>
      <Header />
      <main className="container">
        <h1 className="page-title">Políticas de Privacidad</h1>
        <section className="contact-section">
          <article>
            <h2>1. Introducción</h2>
            <p>En SISTEC READ, valoramos tu privacidad y protegemos tus datos personales conforme a la normativa aplicable.</p>
            <h2>2. Recopilación de Datos</h2>
            <p>Recopilamos datos como nombre y correo electrónico solo con tu consentimiento.</p>
            <button onClick={() => setMostrarDetalles(!mostrarDetalles)} className="btn btn-primary" style={{ marginTop: '2rem' }}>
              {mostrarDetalles ? 'Ocultar Detalles' : 'Mostrar Más Detalles'}
            </button>
            {mostrarDetalles && <p style={{ marginTop: '1rem' }}>Usamos cookies para mejorar tu experiencia.</p>}
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PoliticasPrivacidad;