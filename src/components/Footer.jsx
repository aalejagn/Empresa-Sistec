// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer new-design" id="footer">
      <div className="footer-main-content">
        <p className="main-info-text">
          Mantente conectado con SISTEC READ y recibe novedades exclusivas.
        </p>
      </div>
      <div className="footer-bottom-bar">
        <div className="footer-links-row">
          <p className="copyright-text">
            &copy; 2025 <strong>SISTEC READ</strong>. Todos los derechos reservados.
          </p>
          <ul className="legal-links">
            <li><Link to="/politicas-privacidad">Políticas de Privacidad</Link></li>
            <li><span>|</span></li>
            <li><Link to="/terminos-condiciones">Términos y Condiciones</Link></li>
            <li><span>|</span></li>
            <li><Link to="/politica-devolucion">Política de Devolución</Link></li>
          </ul>
        </div>
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
        <div className="payment-icons"></div>
      </div>
    </footer>
  );
}

export default Footer;