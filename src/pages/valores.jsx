// src/pages/Valores.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';

function Valores() {
  const [selectedValor, setSelectedValor] = useState(null);

  return (
    <div>
      <Header />
      <main className="container">
        <h1 className="page-title">Valores</h1>
        <section className="about-section">
          <article>
            <h2 className="vision-titulo">Nuestros Valores</h2>
            <ol className="list-ordenada-valores">
              <li onClick={() => setSelectedValor(0)} style={{ cursor: 'pointer', color: selectedValor === 0 ? 'red' : 'inherit' }}>
                <strong>Pasión por la lectura:</strong> Creemos en el poder transformador de los libros.
                {selectedValor === 0 && <p style={{ fontStyle: 'italic' }}>Este valor nos impulsa a promover la lectura diaria.</p>}
              </li>
              <li onClick={() => setSelectedValor(1)} style={{ cursor: 'pointer', color: selectedValor === 1 ? 'red' : 'inherit' }}>
                <strong>Diversidad e inclusión:</strong> Ofrecemos un catálogo amplio para diferentes intereses.
                {selectedValor === 1 && <p style={{ fontStyle: 'italic' }}>Incluimos autores de diversas culturas y géneros.</p>}
              </li>
              <li onClick={() => setSelectedValor(2)} style={{ cursor: 'pointer', color: selectedValor === 2 ? 'red' : 'inherit' }}>
                <strong>Innovación educativa:</strong> Buscamos nuevas formas de acercar la literatura.
                {selectedValor === 2 && <p style={{ fontStyle: 'italic' }}>Usamos tecnología para talleres interactivos.</p>}
              </li>
              <li onClick={() => setSelectedValor(3)} style={{ cursor: 'pointer', color: selectedValor === 3 ? 'red' : 'inherit' }}>
                <strong>Integridad y confianza:</strong> Actuamos con transparencia y honestidad.
                {selectedValor === 3 && <p style={{ fontStyle: 'italic' }}>Mantenemos altos estándares éticos en todas nuestras operaciones.</p>}
              </li>
              <li onClick={() => setSelectedValor(4)} style={{ cursor: 'pointer', color: selectedValor === 4 ? 'red' : 'inherit' }}>
                <strong>Calidad en el servicio:</strong> Brindamos atención cercana y personalizada.
                {selectedValor === 4 && <p style={{ fontStyle: 'italic' }}>Nuestro equipo está capacitado para ofrecer el mejor servicio.</p>}
              </li>
            </ol>
            <div className="images-container">
              <div className="card-valor">
                <img src="https://i.pinimg.com/736x/09/ee/50/09ee50371068b85174bbb7e7c0982dc2.jpg" className="libro-valores" alt="Calidad en el servicio" />
                <p className="text-valor">Calidad en el servicio</p>
              </div>
              <div className="card-valor">
                <img src="https://i.pinimg.com/736x/77/41/13/77411399ad06bf6a097597c4eaa2b471.jpg" className="libro-valores" alt="Pasión por la lectura" />
                <p className="text-valor">Pasión por la lectura</p>
              </div>
              <div className="card-valor">
                <img src="https://i.pinimg.com/1200x/17/35/0b/17350b4247a4ec56d8026060ef909a14.jpg" className="libro-valores" alt="Diversidad e inclusión" />
                <p className="text-valor">Diversidad e inclusión</p>
              </div>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Valores;