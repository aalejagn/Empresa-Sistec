// src/pages/Ubicacion.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import "../assets/css/global.css";
import "../assets/css/header.css";
import "../assets/css/footer.css";
import "../assets/css/ubicacion.css";

const Ubicacion = () => {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <h1 className="page-title">Ubicación de SISTEC READ</h1>
          <section className="location-section">
            <h2 className="section-title">Detalles de Ubicación</h2>
            {/* Encabezado añadido */}
            <article>
              <h2 className="categoria-titulo">Nuestra librería</h2>
              <p>
                Visítanos en el corazón de Tuxtla Gutiérrez. Nuestra tienda ofrece
                un ambiente acogedor y una amplia selección de libros para todas
                las edades.
              </p>
              <p>
                <strong>Dirección:</strong> Av. Central Poniente 123, Centro,
                Tuxtla Gutiérrez, Chiapas, CP 29000
              </p>
              <table className="location-table">
                <caption>
                  Horarios de atención
                </caption>
                <thead>
                  <tr>
                    <th>Día</th>
                    <th>Horario</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lunes a viernes</td>
                    <td>9:00 AM - 8:00 PM</td>
                  </tr>
                  <tr>
                    <td>Sábado</td>
                    <td>10:00 AM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td>Domingo</td>
                    <td>Cerrado</td>
                  </tr>
                </tbody>
              </table>
            </article>
            <aside>
              <h3>Cómo llegar</h3>
              <ul>
                <li>
                  <strong>En auto:</strong> Estacionamiento disponible en las
                  calles aledañas.
                </li>
                <li>
                  <strong>Transporte público:</strong> Colectivo línea 1, parada
                  "Plaza Central".
                </li>
                <li>
                  <strong>A pie:</strong> A 5 minutos caminando desde la Catedral
                  de San Marcos.
                </li>
              </ul>
            </aside>
            <article className="section-map">
              <h2 className="categoria-titulo">Encuéntranos en el mapa</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.706311176253!2d-93.1593683!3d16.760791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ecd98cdd9a8c75%3A0xbba0ef33c7665ea4!2sCasa%20de%20gopar%20Toledo!5e0!3m2!1ses-419!2smx!4v1727463799999!5m2!1ses-419!2smx"
                width="600"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación SISTEC READ"
              >
              </iframe>
            </article>
          </section>
        </div>
      </main>

      {/* Footer - Ahora como componente */}
      <Footer />
      
    </>
  );
};

export default Ubicacion;