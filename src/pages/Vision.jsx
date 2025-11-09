// src/pages/Vision.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


const Vision = () => {
  return (
    <>
      <Header />

      <main>
        {/* Ahora crearemos el cuerpo para nuestros dato de visión */}
        <div className="container">
          <section className="about-section">
            <h1 className="page-title">Visión</h1>
            <article>
              <h2 className="vision-titulo">Nuestra visión</h2>
              <p>
                Nuestra visión es consolidarnos como la librería de referencia en
                Chiapas y expandirnos a nivel regional, siendo reconocidos no solo
                por nuestra amplia oferta y precios accesibles, sino también por
                nuestro papel activo en la formación de una comunidad lectora.
                Aspiramos a ser un motor cultural que motive a niños, jóvenes y
                adultos a descubrir la riqueza de la literatura, transformando el
                hábito de la lectura en un pilar para el desarrollo académico,
                profesional y humano de nuestra sociedad.
              </p>
              <img
                src="https://i.pinimg.com/736x/e8/f2/17/e8f2177d41fafd8ce27fe16276001133.jpg"
                alt="Visión SISTEC READ"
                className="libro-vision"
              />
            </article>
            <aside>
              <h3>Nuestro Futuro</h3>
              <p>
                En <strong>SISTEC READ</strong> imaginamos un futuro donde la
                lectura sea parte del día a día de cada persona. Trabajamos para
                crear espacios literarios accesibles, fortalecer alianzas con
                instituciones educativas y fomentar la publicación de autores
                locales, consolidando un movimiento lector que trascienda
                generaciones.
              </p>
            </aside>
          </section>
        </div>
      </main>

      {/* Footer - Ahora como componente */}
      <Footer />
      
    </>
  );
};

export default Vision;