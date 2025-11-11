// src/pages/Contactanos.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Contactanos = () => {
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main>
        <div className="container">
          <section className="contact-section">
            {/* TÍTULO DE PÁGINA */}
            <h1 className="page-title">Contáctanos</h1>

            {/* ARTÍCULO PRINCIPAL (INTRO + FORMULARIO) */}
            <article>
              <h2 className="categoria-titulo">Envíanos un mensaje</h2>
              <p>
                Estamos aquí para ayudarte. Usa el formulario a continuación para ponerte en contacto con nosotros sobre cualquier consulta, sugerencia o problema que tengas. Nuestro equipo responderá lo antes posible.
              </p>

              {/* FORMULARIO */}
              <form className="contact-form">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  placeholder="Tu nombre completo"
                  maxLength="50"
                />

                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="tuemail@ejemplo.com"
                  maxLength="50"
                />

                <label htmlFor="asunto">Asunto:</label>
                <select id="asunto" name="asunto" required>
                  <option value="">Selecciona un asunto</option>
                  <option value="informacion">Información sobre libros</option>
                  <option value="pedidos">Seguimiento de pedidos</option>
                  <option value="sugerencias">Sugerencias</option>
                  <option value="otro">Otro</option>
                </select>

                <label htmlFor="mensaje">Mensaje:</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="5"
                  required
                  placeholder="Escribe tu mensaje aquí"
                  maxLength="500"
                ></textarea>

                <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
            </article>

            {/* ASIDE (OTRAS FORMAS DE CONTACTO) */}
            <aside>
              <h3>Otras formas de contacto</h3>
              <ul>
                <li>
                  <strong>Correo:</strong>
                  <a href="mailto:infosistecread@gmail.com">
                    <i className="fas fa-envelope"></i>sistecread.info@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Teléfono:</strong> 
                  <a href="tel:+529611234567">+52 (961) 123-4567</a>
                </li>
                <li>
                  <strong>Contacto por áreas:</strong>
                  <ul>
                    <li>
                      <strong>Ventas:</strong>
                      <a href="mailto:ventassistecread@gmail.com">
                        <i className="fas fa-envelope"></i> ventassistecread@gmail.com
                      </a>
                    </li>
                    <li>
                      <strong>Soporte técnico:</strong>
                      <a href="mailto:soportesistecread@gmail.com">
                        <i className="fas fa-envelope"></i> soportesistecread@gmail.com
                      </a>
                    </li>
                    <li>
                      <strong>Facturación:</strong>
                      <a href="mailto:facturacionsistecread@gmail.com">
                        <i className="fas fa-envelope"></i> facturacionsistecread@gmail.com
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </aside>
          </section>
        </div>
      </main>

      {/* Footer - Ahora como componente */}
      <Footer />
      
    </>
  );
};

export default Contactanos;