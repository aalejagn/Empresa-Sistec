import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/LoginFooter.css";


const LoginFooter = () => {
  return (
    <footer className="footer new-design" id="login-footer">
      <div className="footer-bottom-bar">
        <div className="footer-links-row">
          <p className="copyright-text">
            &copy; 2025 <strong>SISTEC READ</strong>. Todos los derechos
            reservados.
          </p>
          <ul className="legal-links">
            <li>
              <span>|</span>
            </li>
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
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default LoginFooter;