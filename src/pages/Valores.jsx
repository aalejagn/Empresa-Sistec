// src/pages/Valores.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import "../assets/css/global.css";
import "../assets/css/header.css";
import "../assets/css/footer.css";
import "../assets/css/valores.css";

const Valores = () => {
  return (
    <>
      <Header />

      <main>
        {/* Ahora crearemos el cuerpo para nuestros dato de visión */}
        <div className="container">
          <section className="about-section">
            <h1 className="page-title">Valores</h1>
            <article>
              <h2 className="vision-titulo">Nuestros Valores</h2>
              <ol id="list-ordenada-valores" className="list-ordenada-valores">
                <li className="list-valores">
                  <strong> Accesibilidad:</strong> Promovemos la lectura como un
                  derecho de todos, garantizando precios justos y disponibilidad
                  para cualquier público.
                </li>
                <li className="list-valores">
                  <strong>Pasión por la lectura:</strong> Creemos en el poder de
                  los libros para transformar vidas y compartimos esa pasión con
                  cada cliente.
                </li>
                <li className="list-valores">
                  <strong>Compromiso comunitario:</strong> Estamos profundamente
                  vinculados con Chiapas y buscamos fortalecer su cultura lectora.
                </li>
                <li className="list-valores">
                  <strong>Diversidad e inclusión:</strong> Ofrecemos un catálogo
                  amplio que responde a diferentes intereses, edades y contextos.
                </li>
                <li className="list-valores">
                  <strong>Innovación educativa: </strong>Buscamos constantemente
                  nuevas formas de acercar la literatura como herramienta de
                  aprendizaje.
                </li>
                <li className="list-valores">
                  <strong>Integridad y confianza: </strong>Actuamos con
                  transparencia, honestidad y responsabilidad en cada aspecto de
                  nuestra gestión.
                </li>
                <li className="list-valores">
                  <strong>Calidad en el servicio: </strong> Nos esforzamos por
                  brindar atención cercana, profesional y personalizada a cada
                  lector.
                </li>
              </ol>
              <div className="images-container">
                <div className="card-valor">
                  <img
                    src="https://i.pinimg.com/736x/09/ee/50/09ee50371068b85174bbb7e7c0982dc2.jpg"
                    alt="Calidad en el servicio"
                    className="libro-valores"
                  />
                  <p className="text-valor">Calidad en el servicio</p>
                </div>
                <div className="card-valor">
                  <img
                    src="https://i.pinimg.com/736x/77/41/13/77411399ad06bf6a097597c4eaa2b471.jpg"
                    alt="Pasión por la lectura"
                    className="libro-valores"
                  />
                  <p className="text-valor">Pasión por la lectura</p>
                </div>
                <div className="card-valor">
                  <img
                    src="https://i.pinimg.com/1200x/17/35/0b/17350b4247a4ec56d8026060ef909a14.jpg"
                    alt="Diversidad e inclusión"
                    className="libro-valores"
                  />
                  <p className="text-valor">Diversidad e inclusión</p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>

      {/* Footer - Ahora como componente */}
      <Footer />
      
    </>
  );
};

export default Valores;