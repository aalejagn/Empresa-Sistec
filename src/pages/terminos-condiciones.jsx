// src/pages/TerminosCondiciones.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/legal-pages.css';
import '../assets/css/footer.css';

function TerminosCondiciones() {
  const [aceptado, setAceptado] = useState(false);

  return (
    <div>
      <Header />
      <main className="container">
        <h1 className="page-title">Términos y Condiciones</h1>
        <section className="contact-section">
          <article>
            <h2>1. Aceptación de Términos</h2>
            <p>Al acceder y utilizar este sitio web, usted acepta cumplir con estos términos y condiciones.</p>
            <h2>2. Uso del Sitio</h2>
            <p>Usted se compromete a no utilizar el sitio para fines ilegales o prohibidos.</p>
            <ul className="list-valores">
              <li>No interferir con la seguridad del sitio</li>
              <li>No transmitir virus o código malicioso</li>
              <li>No recopilar datos sin autorización</li>
            </ul>
            <h2>3. Pedidos y Envíos</h2>
            <p>Nos esforzamos por procesar pedidos en 1-2 días hábiles.</p>
            <h2>4. Precios y Pagos</h2>
            <p>Los precios están en USD/MXN y pueden cambiar sin previo aviso.</p>
            <h2>5. Envíos</h2>
            <p>Enviamos a través de proveedores confiables. No nos responsabilizamos por retrasos debido a aduanas o eventos fuera de nuestro control.</p>
            <ul className="list-valores">
              <li>Daños en tránsito</li>
              <li>Retrasos por aduanas</li>
              <li>Condiciones meteorológicas o circunstancias fuera de nuestro control</li>
            </ul>
            <h2>6. Propiedad Intelectual</h2>
            <p>Todo el contenido del sitio web es propiedad de SISTEC READ y está protegido por leyes de derechos de autor.</p>
            <h2>7. Contacto</h2>
            <p><strong>Email:</strong> legal@sistecread.com</p>
            <p><strong>Teléfono:</strong> +52 961 123 4567</p>
            <p><strong>Última actualización:</strong> Octubre 2025</p>
            <button onClick={() => setAceptado(true)} className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Aceptar Términos
            </button>
            {aceptado && <p style={{ color: 'green', marginTop: '1rem' }}>¡Términos aceptados!</p>}
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default TerminosCondiciones;