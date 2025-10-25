// src/pages/Mision.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';

function Mision() {
  return (
    <div>
      <Header />
      <main className="container">
        <h1 className="page-title">Misión</h1>
        <section className="about-section">
          <article>
            <h2>Nuestra Misión</h2>
            <p>En SISTEC READ, nuestra misión es fomentar la lectura y el acceso al conocimiento, ofreciendo libros de calidad a precios accesibles y promoviendo la cultura en nuestra comunidad.</p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Mision;