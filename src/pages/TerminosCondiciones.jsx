// src/pages/TerminosCondiciones.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import "../assets/css/global.css";
// import "../assets/css/style.css";
import "../assets/css/header.css";
import "../assets/css/legal-pages.css";
import "../assets/css/footer.css";

const TerminosCondiciones = () => {
  return (
    <>
      <Header />

      {/* Contenido Principal */}
      <main>
        <div className="container">
          <section className="contact-section">
            <h1 className="page-title">Términos y Condiciones</h1>

            <article>
              <h2>1. Aceptación de Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de SISTEC READ, usted acepta
                estar sujeto a estos términos y condiciones. Si no está de acuerdo
                con alguna parte de estos términos, no debe usar nuestros
                servicios.
              </p>

              <h2>2. Uso del Sitio Web</h2>
              <p>
                El contenido de este sitio es únicamente para su información
                general y uso personal. Está sujeto a cambios sin previo aviso.
              </p>
              <ul className="list-valores">
                <li>
                  No debe usar el sitio de manera que cause daño al sitio o
                  interfiera con su disponibilidad
                </li>
                <li>
                  No debe intentar obtener acceso no autorizado a ninguna parte
                  del sitio
                </li>
                <li>
                  Debe proporcionar información precisa y actualizada al crear una
                  cuenta
                </li>
              </ul>

              <h2>3. Productos y Servicios</h2>
              <p>SISTEC READ se reserva el derecho de:</p>
              <ul className="list-valores">
                <li>
                  Modificar o descontinuar cualquier producto sin previo aviso
                </li>
                <li>Limitar la cantidad de productos que se pueden comprar</li>
                <li>Rechazar cualquier pedido a nuestra discreción</li>
                <li>Corregir errores en precios o descripciones de productos</li>
              </ul>

              <h2>4. Precios y Pagos</h2>
              <p>
                Todos los precios están en pesos mexicanos (MXN) e incluyen IVA
                cuando aplique.
              </p>
              <ul className="list-valores">
                <li>Los precios pueden cambiar sin previo aviso</li>
                <li>
                  Aceptamos tarjetas de crédito, débito y otros métodos de pago
                  especificados
                </li>
                <li>El pago debe completarse antes del envío del pedido</li>
                <li>
                  En caso de error en el precio, se notificará al cliente antes de
                  procesar el pedido
                </li>
              </ul>

              <h2>5. Envíos y Entregas</h2>
              <p>Los tiempos de entrega son estimados y pueden variar según:</p>
              <ul className="list-valores">
                <li>Disponibilidad del producto</li>
                <li>Ubicación de entrega</li>
                <li>
                  Condiciones meteorológicas o circunstancias fuera de nuestro
                  control
                </li>
              </ul>

              <h2>6. Propiedad Intelectual</h2>
              <p>
                Todo el contenido del sitio web es propiedad de SISTEC READ y está
                protegido por leyes de derechos de autor.
              </p>

              <h2>7. Contacto</h2>
              <p><strong>Email:</strong> legal@sistecread.com</p>
              <p><strong>Teléfono:</strong> +52 961 123 4567</p>
              <p><strong>Última actualización:</strong> Octubre 2025</p>
            </article>
          </section>
        </div>
      </main>

      {/* Footer - Ahora como componente */}
      <Footer />
      
    </>
  );
};

export default TerminosCondiciones;