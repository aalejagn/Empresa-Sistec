// src/pages/AcercaDe.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';

function AcercaDe() {
  return (
    <div>
      <Header />
      <main className="container">
        <h1 className="page-title">Acerca de SISTEC READ</h1>
        <section className="about-section">
          <article>
            <h2 className="categoria-titulo">Nuestra Historia</h2>
            <p>En SISTEC READ, somos apasionados por la lectura y el conocimiento. Fundada en 2025, nuestra librería se dedica a ofrecer una amplia selección de libros para todos los gustos y edades.</p>
            <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pila de libros" className="libro-imagen" />
          </article>
          <aside>
            <h3>¿Por qué elegirnos?</h3>
            <ul>
              <li>Catálogo extenso de géneros literarios.</li>
              <li>Asesoría personalizada.</li>
              <li>Eventos culturales.</li>
              <li>Precios justos.</li>
            </ul>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AcercaDe;