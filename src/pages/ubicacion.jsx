// src/pages/Ubicacion.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';

function Ubicacion() {
  const [mostrarHorarios, setMostrarHorarios] = useState(false);

  return (
    <div>
      <Header />
      <main className="container">
        <h1 className="page-title">Ubicación de SISTEC READ</h1>
        <section className="location-section">
          <h2 className="section-title">Detalles de Ubicación</h2>
          <article>
            <h2 className="categoria-titulo">Nuestra Dirección</h2>
            <p>Calle Ejemplo #123, Colonia Centro, Tuxtla Gutiérrez, Chiapas, México.</p>
            <button onClick={() => setMostrarHorarios(!mostrarHorarios)} className="btn btn-primary">
              {mostrarHorarios ? 'Ocultar Horarios' : 'Mostrar Horarios'}
            </button>
            {mostrarHorarios && (
              <table className="horarios-table">
                <thead>
                  <tr>
                    <th>Día</th>
                    <th>Horario</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Lunes a Viernes</td><td>9:00 AM - 8:00 PM</td></tr>
                  <tr><td>Sábado</td><td>10:00 AM - 6:00 PM</td></tr>
                  <tr><td>Domingo</td><td>Cerrado</td></tr>
                </tbody>
              </table>
            )}
          </article>
          <aside>
            <h3>Cómo llegar</h3>
            <ul>
              <li><strong>En auto:</strong> Estacionamiento disponible en las calles aledañas.</li>
              <li><strong>Transporte público:</strong> Colectivo línea 1, parada "Plaza Central".</li>
              <li><strong>A pie:</strong> A 5 minutos caminando desde la Catedral de San Marcos.</li>
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
            ></iframe>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Ubicacion;