// src/pages/PoliticaDevolucion.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/style.css';
import '../assets/css/legal-pages.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';
function PoliticaDevolucion() {
  const [mostrarPolitica, setMostrarPolitica] = useState(false);

  return (
    <div>
      <Header />
      <main className="container">
        <h1 className="page-title">Política de Devolución</h1>
        <section className="contact-section">
          <article>
            <h2>1. Plazos de Devolución</h2>
            <p>Tienes 30 días para devolver productos desde la fecha de entrega.</p>
            <button onClick={() => setMostrarPolitica(!mostrarPolitica)} className="btn btn-primary" style={{ marginTop: '2rem' }}>
              {mostrarPolitica ? 'Ocultar Detalles' : 'Mostrar Condiciones'}
            </button>
            {mostrarPolitica && (
              <ul className="list-valores">
                <li>Producto sin uso y con empaque original.</li>
                <li>Recibo de compra requerido.</li>
              </ul>
            )}
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PoliticaDevolucion;