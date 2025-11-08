// src/pages/PoliticasPrivacidad.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../assets/css/global.css";
import "../assets/css/header.css";
import "../assets/css/legal-pages.css";
import "../assets/css/legal-pages-responsive.css"; // ← NUEVO
import "../assets/css/footer.css";

const PoliticasPrivacidad = () => {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <section className="contact-section">
            <h1 className="page-title">Políticas de Privacidad</h1>

            {/* CAMBIO AQUÍ: legal-article → privacy-content */}
            <div className="privacy-content">
              <h2>1. Información que Recopilamos</h2>
              <p>
                En SISTEC READ, nos comprometemos a proteger su privacidad.
                Recopilamos la siguiente información:
              </p>
              <ul className="list-valores-politicas">
                <li><strong>Información Personal:</strong> Nombre, correo electrónico, dirección, teléfono</li>
                <li><strong>Información de Compra:</strong> Historial de pedidos, preferencias de lectura</li>
                <li><strong>Información Técnica:</strong> Dirección IP, tipo de navegador, cookies</li>
              </ul>

              <h2>2. Uso de la Información</h2>
              <p>Utilizamos su información personal para:</p>
              <ul className="list-valores-politicas">
                <li>Procesar sus pedidos y entregas</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>Enviar notificaciones sobre promociones y novedades (con su consentimiento)</li>
                <li>Cumplir con obligaciones legales y fiscales</li>
              </ul>

              <h2>3. Protección de Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para
                proteger su información personal contra acceso no autorizado,
                alteración, divulgación o destrucción.
              </p>

              <h2>4. Compartir Información</h2>
              <p>
                No vendemos ni compartimos su información personal con terceros,
                excepto:
              </p>
              <ul className="list-valores-politicas">
                <li>Proveedores de servicios necesarios para completar su pedido (ej. empresas de mensajería)</li>
                <li>Cuando sea requerido por ley</li>
                <li>Con su consentimiento explícito</li>
              </ul>

              <h2>5. Cookies</h2>
              <p>
                Utilizamos cookies para mejorar su experiencia de navegación.
                Puede configurar su navegador para rechazar cookies, aunque esto
                puede limitar algunas funcionalidades del sitio.
              </p>

              <h2>6. Sus Derechos</h2>
              <p>Usted tiene derecho a:</p>
              <ul className="list-valores-politicas">
                <li>Acceder a sus datos personales</li>
                <li>Rectificar información incorrecta</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Oponerse al procesamiento de sus datos</li>
                <li>Retirar su consentimiento en cualquier momento</li>
              </ul>

              <h2>7. Contacto</h2>
              <p>
                Para ejercer sus derechos o realizar consultas sobre nuestras
                políticas de privacidad, contáctenos en:
              </p>
              <p><strong>Email:</strong> privacidad@sistecread.com</p>
              <p><strong>Teléfono:</strong> +52 961 123 4567</p>

              <h2>8. Actualizaciones</h2>
              <p>
                Nos reservamos el derecho de actualizar estas políticas. Las
                modificaciones serán publicadas en esta página con la fecha de la
                última actualización.
              </p>
              <p><strong>Última actualización:</strong> Noviembre 2025</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PoliticasPrivacidad;