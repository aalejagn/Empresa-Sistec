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
                Conoce a los desarrolladores apasionados que hacen posible SISTEC READ
              </p>

              <div className="team-grid">
                {/* ALESIYO */}
                <div className="team-member">
                  <div className="team-photo">
                    <img 
                      src="blob:https://onedrive.live.com/0fd3d645-6f28-4838-8967-a0e06c539e5c" 
                      alt="Alesiyo - Desarrollador Backend"
                      loading="lazy"
                    />
                  </div>
                  <div className="team-info">
                    <h3>Alesiyo</h3>
                    <p className="team-role">Backend Developer & Database Architect</p>
                    <p className="team-description">
                      Experto en desarrollo backend y arquitectura de bases de datos. 
                      Alesiyo construye la columna vertebral de SISTEC READ, asegurando 
                      que cada operación sea rápida, segura y escalable.
                    </p>
                  </div>
                </div>

                {/* CHESTER */}
                <div className="team-member">
                  <div className="team-photo">
                    <img 
                      src="/ruta/a/tu/imagen-chester.jpg" 
                      alt="Chester - Desarrollador Frontend"
                      loading="lazy"
                    />
                  </div>
                  <div className="team-info">
                    <h3>Chester</h3>
                    <p className="team-role">Frontend Developer & UI Specialist</p>
                    <p className="team-description">
                      Maestro del frontend y especialista en interfaces de usuario. 
                      Chester transforma ideas en experiencias visuales atractivas e 
                      intuitivas que los usuarios disfrutan navegar.
                    </p>
                  </div>
                </div>

                {/* FERNANDO */}
                <div className="team-member">
                  <div className="team-photo">
                    <img 
                      src="/ruta/a/tu/imagen-fernando.jpg" 
                      alt="Fernando - Tester y Estratega"
                      loading="lazy"
                    />
                  </div>
                  <div className="team-info">
                    <h3>Fernando</h3>
                    <p className="team-role">QA Tester & Creative Strategist</p>
                    <p className="team-description">
                      Generador de ideas y guardian de la calidad. Fernando prueba 
                      cada funcionalidad hasta el más mínimo detalle y aporta ideas 
                      innovadoras que mejoran constantemente nuestra plataforma.
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