import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../assets/css/footer.css";
import "../assets/css/global.css"

const Footer = () => {
  return (
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
            <li>
              <Link to="/mision" className="nav-link">
                Mision
              </Link>
            </li>
            <li>
              <span>|</span>
            </li>
            <li>
              <Link to="/vision" className="nav-link">
                Vision
              </Link>
            </li>
            <li>
              <span>|</span>
            </li>
            <li>
              <Link to="/valores" className="nav-link">
                Valores
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-links-row">
          <p className="copyright-text">
            &copy; 2025 <strong>SISTEC READ</strong>. Todos los derechos
            reservados.
          </p>
          <ul className="legal-links">
            <li>
              <Link to="/politicaprivacidad" className="nav-link">
                Politicas de privacidad
              </Link>
            </li>
            <li>
              <span>|</span>
            </li>
            <li>
              <Link to="/terminoscondiciones" className="nav-link">
                Terminos y Condiciones
              </Link>
            </li>
            <li>
              <span>|</span>
            </li>
            <li>
              <Link to="/politicadevolucion" className="nav-link">
                Politicas De Devolucion
              </Link>
            </li>
          </ul>
        </div>
        <div className="payment-icons"></div>
      </div>
    </footer>
  );
};

export default Footer;
