// src/pages/PoliticaDevolucion.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


const PoliticaDevolucion = () => {
  return (
    <>
      <Header />

      {/* Contenido Principal */}
      <main>
        <div className="container">
          <section className="contact-section">
            <h1 className="page-title">Política de Devolución</h1>

            <article className="privacy-content">
              <h2>1. Plazo de Devolución</h2>
              <p>
                En SISTEC READ, queremos que esté completamente satisfecho con su
                compra. Aceptamos devoluciones dentro de los siguientes plazos:
              </p>
              <ul className="list-valores-politicas">
                <li>
                  <strong>30 días naturales</strong> a partir de la fecha de
                  recepción del producto
                </li>
                <li>
                  El producto debe estar en su estado original, sin uso y con el
                  empaquetado intacto
                </li>
                <li>
                  Debe incluir todos los accesorios, manuales y empaques
                  originales
                </li>
              </ul>

              <h2>2. Condiciones para Devolución</h2>
              <p>
                Para procesar su devolución, el producto debe cumplir con las
                siguientes condiciones:
              </p>
              <ul className="list-valores-politicas">
                <li>El libro no debe tener marcas, subrayados o daños</li>
                <li>La envoltura original (si aplica) debe estar intacta</li>
                <li>Debe conservar el comprobante de compra o factura</li>
                <li>
                  Los artículos personalizados o en oferta especial pueden no ser
                  elegibles para devolución
                </li>
              </ul>

              <h2>3. Productos No Retornables</h2>
              <p>Los siguientes productos NO son elegibles para devolución:</p>
              <ul className="list-valores-politicas">
                <li>Libros digitales o descargas electrónicas</li>
                <li>
                  Libros con envoltura plástica sellada que haya sido removida
                </li>
                <li>Productos en liquidación o descuento superior al 50%</li>
                <li>Tarjetas de regalo o códigos promocionales</li>
                <li>Productos personalizados o hechos bajo pedido</li>
              </ul>

              <h2>4. Proceso de Devolución</h2>
              <p>Para iniciar una devolución, siga estos pasos:</p>
              <ul className="list-valores-politicas">
                <li>
                  <strong>Paso 1:</strong> Contacte nuestro servicio al cliente en
                  devoluciones@sistecread.com o al +52 961 123 4567
                </li>
                <li>
                  <strong>Paso 2:</strong> Proporcione su número de pedido y
                  motivo de la devolución
                </li>
                <li>
                  <strong>Paso 3:</strong> Reciba su número de autorización de
                  devolución (RMA)
                </li>
                <li>
                  <strong>Paso 4:</strong> Empaque el producto de forma segura con
                  el número RMA visible
                </li>
                <li>
                  <strong>Paso 5:</strong> Envíe el paquete a la dirección
                  proporcionada
                </li>
              </ul>

              <h2>5. Reembolsos</h2>
              <p>Una vez recibida y verificada su devolución:</p>
              <ul className="list-valores-politicas">
                <li>El reembolso se procesará dentro de 5-10 días hábiles</li>
                <li>El monto será devuelto al método de pago original</li>
                <li>Los costos de envío original NO son reembolsables</li>
                <li>
                  Los gastos de envío de devolución corren por cuenta del cliente,
                  excepto en casos de productos defectuosos
                </li>
              </ul>

              <h2>6. Cambios</h2>
              <p>Si desea cambiar un producto por otro:</p>
              <ul className="list-valores-politicas">
                <li>El producto debe cumplir las condiciones de devolución</li>
                <li>
                  Solo se permiten cambios por productos de igual o mayor valor
                </li>
                <li>
                  Si el nuevo producto tiene mayor valor, deberá pagar la
                  diferencia
                </li>
                <li>
                  Si tiene menor valor, se emitirá un crédito para futuras compras
                </li>
              </ul>

              <h2>7. Productos Defectuosos o Dañados</h2>
              <p>Si recibe un producto defectuoso o dañado:</p>
              <ul className="list-valores-politicas">
                <li>
                  Notifíquenos dentro de las 48 horas posteriores a la recepción
                </li>
                <li>Proporcione fotografías del daño o defecto</li>
                <li>
                  Procesaremos el reembolso completo o enviaremos un reemplazo sin
                  costo adicional
                </li>
                <li>Los gastos de envío serán cubiertos por SISTEC READ</li>
              </ul>

              <h2>8. Excepciones y Casos Especiales</h2>
              <p>En caso de circunstancias especiales:</p>
              <ul className="list-valores-politicas">
                <li>
                  Pedidos incorrectos enviados por error serán reemplazados sin
                  costo
                </li>
                <li>
                  En caso de paquetes extraviados, trabajaremos con la paquetería
                  para resolver el problema
                </li>
                <li>Para regalos, el crédito se emitirá al comprador original</li>
              </ul>

              <h2>9. Tiempos de Procesamiento</h2>
              <p>Plazos aproximados del proceso:</p>
              <ul className="list-valores-politicas">
                <li><strong>Autorización RMA:</strong> 1-2 días hábiles</li>
                <li>
                  <strong>Inspección del producto devuelto:</strong> 3-5 días
                  hábiles
                </li>
                <li>
                  <strong>Procesamiento de reembolso:</strong> 5-10 días hábiles
                </li>
                <li>
                  <strong>Reflejo en cuenta bancaria:</strong> 3-5 días hábiles
                  adicionales (según el banco)
                </li>
              </ul>

              <h2>10. Contacto</h2>
              <p>Para cualquier consulta sobre devoluciones o reembolsos:</p>
              <p><strong>Email:</strong> devoluciones@sistecread.com</p>
              <p><strong>Teléfono:</strong> +52 961 123 4567</p>
              <p>
                <strong>Horario de atención:</strong> Lunes a Viernes, 9:00 AM -
                6:00 PM
              </p>
              <p>
                <strong>Dirección para devoluciones:</strong> Se proporcionará al
                solicitar el número RMA
              </p>

              <h2>11. Garantía de Satisfacción</h2>
              <p>
                En SISTEC READ nos comprometemos con su satisfacción. Si tiene
                algún problema con su compra, no dude en contactarnos. Haremos
                todo lo posible para resolver cualquier inconveniente de manera
                justa y oportuna.
              </p>

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

export default PoliticaDevolucion;