// src/pages/Mision.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Mision = () => {
  return (
    <>
      <Header />

      <main>
        {/* Ahora crearemos el cuerpo para nuestros dato de mision */}
        <div className="container">
          <section className="about-section">
            <h1 className="page-title">Misión</h1>
            <article>
              <h2 className="mision-titulo">SISTEC READ</h2>
              <p>
                Nuestra misión es democratizar el acceso a la literatura
                ofreciendo libros de calidad a precios accesibles. Creemos
                firmemente que la lectura es una herramienta esencial para el
                aprendizaje, la reflexión y el crecimiento personal. Por ello,
                trabajamos para inspirar a nuestros lectores, fomentar la
                comprensión lectora y acercar la literatura a todos los sectores
                de la sociedad chiapaneca, convirtiendo cada libro en una
                oportunidad de descubrir nuevos mundos y conocimientos.
              </p>
              <img
                src="https://i.pinimg.com/1200x/30/c1/14/30c114d5393509e97ed1e01d3332502a.jpg"
                alt="Misión SISTEC READ"
                className="libro-mision"
              />
            </article>
            <aside>
              <h3>Inspiración Literaria</h3>
              <p>
                La lectura transforma, inspira y abre caminos. En
                <strong> SISTEC READ</strong>, cada historia tiene el poder de
                cambiar vidas y despertar nuevas perspectivas. Queremos que cada
                página que leas te acerque un poco más a ti mismo y al mundo que
                te rodea
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

export default Mision;