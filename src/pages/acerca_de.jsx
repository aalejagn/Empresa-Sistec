// src/pages/AcercaDe.jsx
import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

import "../assets/css/global.css";
import "../assets/css/header.css";
import "../assets/css/footer.css";
import "../assets/css/valores.css"; // ESTE ES EL CLAVE

const AcercaDe = () => {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <section className="about-section">
            {/* TÍTULO CON DEGRADADO */}
            <h1 className="page-title">Acerca de SISTEC READ</h1>

            <article>
              {/* SUBTÍTULO CON LÍNEA AZUL */}
              <h2 className="categoria-titulo">Nuestra historia</h2>

              {/* PÁRRAFO CON COMILLAS DECORATIVAS */}
              <p>
                SISTEC READ fue fundada en 2025 en Tuxtla Gutiérrez por un grupo
                de apasionados por la lectura: <strong>Gutiérrez Nuñez Alejandro</strong>,
                <strong> Guzmán Chablé Jeizer Oswaldo</strong> y
                <strong> Sánchez Villanueva Fernando de Jesús</strong>. Con la
                visión de fomentar el acceso al conocimiento, nuestros fundadores
                crearon una librería que combina un catálogo diverso con un
                compromiso profundo con la comunidad lectora de Chiapas.
                Actualmente, la librería es dirigida por
                <strong> Alejandro Gutiérrez Nuñez</strong>, quien actúa como
                director general, y administrada por
                <strong> Jeizer Guzmán Chablé</strong>, asegurando una gestión
                eficiente y un servicio de calidad para todos nuestros clientes.
              </p>

              {/* IMAGEN REDONDEADA */}
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Librería"
                className="libro-imagen"
                loading="lazy"
              />
            </article>

            {/* ASIDE CON CHECKS VERDES Y LÍNEA ROJA */}
            <aside>
              <h3>¿Por qué elegirnos?</h3>
              <ul>
                <li>Catálogo extenso de géneros literarios.</li>
                <li>Asesoría personalizada para encontrar tu próximo libro.</li>
                <li>Eventos culturales y talleres literarios.</li>
                <li>Precios justos y promociones especiales.</li>
              </ul>
            </aside>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer new-design" id="footer">
        <div className="footer-main-content">
          <p className="main-info-text">
            Mantente conectado con SISTEC READ y recibe novedades exclusivas.
          </p>
        </div>
        <div className="footer-bottom-bar">
          <div className="footer-links-row corporate-row">
            <p className="copyright-text">
              Promoviendo la lectura y el conocimiento en nuestra comunidad.
            </p>
            <ul className="corporate-links">
              <li><Link to="/mision">Misión</Link></li>
              <li><span>|</span></li>
              <li><Link to="/vision">Visión</Link></li>
              <li><span>|</span></li>
              <li><Link to="/valores">Valores</Link></li>
            </ul>
          </div>
          <div className="footer-links-row">
            <p className="copyright-text">
              © 2025 <strong>SISTEC READ</strong>. Todos los derechos reservados.
            </p>
            <ul className="legal-links">
              <li><Link to="/politicas-privacidad">Políticas de Privacidad</Link></li>
              <li><span>|</span></li>
              <li><Link to="/terminos-condiciones">Términos y Condiciones</Link></li>
              <li><span>|</span></li>
              <li><Link to="/politica-devolucion">Política de Devolución</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AcercaDe;