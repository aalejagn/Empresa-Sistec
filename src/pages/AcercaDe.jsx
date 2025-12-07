// src/pages/AcercaDe.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

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
            <aside className="aside-nosotros">
              <h3>¿Por qué elegirnos?</h3>
              <ul>
                <li>Catálogo extenso de géneros literarios.</li>
                <li>Asesoría personalizada para encontrar tu próximo libro.</li>
                <li>Eventos culturales y talleres literarios.</li>
                <li>Precios justos y promociones especiales.</li>
              </ul>
            </aside>

            {/* NUEVA SECCIÓN: NUESTRO EQUIPO */}
            <article className="team-section">
              <h2 className="categoria-titulo">Nuestro Equipo</h2>
              <p className="team-intro">
                Conoce al equipo de tecnología que hace posible tu experiencia en SISTEC READ
              </p>

              <div className="team-grid">
                {/* ALESIYO */}
                <div className="team-member">
                  <div className="team-photo">
                    <img 
                      src="https://res.cloudinary.com/dfcaljjed/image/upload/v1765078751/WhatsApp_Image_2025-12-06_at_9.23.52_PM_jrdia6.jpg" 
                      alt="Alesiyo - Desarrollador Backend"
                      loading="lazy"
                    />
                  </div>
                  <div className="team-info">
                    <h3>Alesiyo</h3>
                    <p className="team-role">Especialista en Sistemas y Bases de Datos</p>
                    <p className="team-description">
                      Encargado de que toda la información de la librería funcione correctamente 
                      detrás de escena. Se asegura de que tus pedidos, búsquedas y compras se 
                      procesen de manera rápida y segura en todo momento.
                    </p>
                  </div>
                </div>

                {/* CHESTER */}
                <div className="team-member">
                  <div className="team-photo">
                    <img 
                      src="https://res.cloudinary.com/dfcaljjed/image/upload/v1765078751/WhatsApp_Image_2025-12-06_at_9.24.31_PM_kwecec.jpg" 
                      alt="Chester - Desarrollador Frontend"
                      loading="lazy"
                    />
                  </div>
                  <div className="team-info">
                    <h3>Chester</h3>
                    <p className="team-role">Diseñador de Experiencia Web</p>
                    <p className="team-description">
                      Responsable de crear la página web que estás viendo ahora mismo. 
                      Chester diseña cada botón, menú y sección para que encuentres tus 
                      libros favoritos de forma fácil y agradable.
                    </p>
                  </div>
                </div>

                {/* FERNANDO */}
                <div className="team-member">
                  <div className="team-photo">
                    <img 
                      src="https://res.cloudinary.com/dfcaljjed/image/upload/v1765078752/WhatsApp_Image_2025-12-06_at_9.25.10_PM_cvj26v.jpg" 
                      alt="Fernando - Tester y Estratega"
                      loading="lazy"
                    />
                  </div>
                  <div className="team-info">
                    <h3>Fernando</h3>
                    <p className="team-role">Control de Calidad e Innovación</p>
                    <p className="team-description">
                      Se encarga de probar que todo funcione perfectamente antes de que llegue 
                      a ti. También aporta nuevas ideas para mejorar tu experiencia de compra 
                      y hacer que SISTEC READ sea cada vez mejor.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AcercaDe;