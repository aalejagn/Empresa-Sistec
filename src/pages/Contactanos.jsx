// src/pages/Contactanos.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Contactanos = () => {

  //Nuevos 01/12
  const { user } = useAuth()
  const navigate = useNavigate()

  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  // Estado para mensaje de respuesta
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ← AQUÍ (protección)
    if (!user) {
      alert("Debes iniciar sesión para enviar un mensaje");
      navigate("/login");
      return;
    }
    setIsLoading(true);
    setStatus("");
    console.log("Enviando datos: ", formData);

    try {
      const response = await fetch("/api/contacto.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("RESPUESTA:", response); // ← AÑADE ESTO

      if (!response.ok) {
        const text = await response.text(); // ← AÑADE ESTO
        console.error("ERROR HTML:", text); // ← AÑADE ESTO
        throw new Error(`HTTP ${response.status}`);
      }
      const result = await response.json();
      console.log("JSON:", result);

      if (result.success) {
        setStatus("Mensaje enviado con éxito!");
        setFormData({ nombre: "", email: "", asunto: "", mensaje: "" }); // Limpiar
      } else {
        setStatus("Error: " + result.error);
      }
    } catch (error) {
      console.error("ERROR EN FETCH:", error); // ← AÑADE ESTO
      console.error("ERROR MESSAGE:", error.message); // ← AÑADE ESTO
      setStatus(
        "Error de conexión. Verifica que el servidor PHP esté corriendo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main>
        <div className="container">
          <section className="contact-section">
            <h1 className="page-title">Contáctanos</h1>

            <article>
              <h2 className="categoria-titulo">Envíanos un mensaje</h2>
              <p>
                Estamos aquí para ayudarte. Usa el formulario a continuación
                para ponerte en contacto con nosotros sobre cualquier consulta,
                sugerencia o problema que tengas. Nuestro equipo responderá lo
                antes posible.
              </p>

              {/* FORMULARIO CONECTADO */}
              <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                  maxLength="50"
                />

                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tuemail@ejemplo.com"
                  maxLength="50"
                />

                <label htmlFor="asunto">Asunto:</label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                >
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
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  placeholder="Escribe tu mensaje aquí"
                  maxLength="500"
                ></textarea>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                </button>
              </form>

              {/* MENSAJE DE ESTADO */}
              {status && (
                <p
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem",
                    backgroundColor: status.includes("éxito")
                      ? "#d4edda"
                      : "#f8d7da",
                    color: status.includes("éxito") ? "#155724" : "#721c24",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  {status}
                </p>
              )}
            </article>

            {/* ASIDE (sin cambios) */}
            <aside>
              <h3>Otras formas de contacto</h3>
              <ul>
                <li>
                  <strong>Correo:</strong>
                  <a href="mailto:infosistecread@gmail.com">
                    sistecread.info@gmail.com
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
                        ventassistecread@gmail.com
                      </a>
                    </li>
                    <li>
                      <strong>Soporte técnico:</strong>
                      <a href="mailto:soportesistecread@gmail.com">
                        soportesistecread@gmail.com
                      </a>
                    </li>
                    <li>
                      <strong>Facturación:</strong>
                      <a href="mailto:facturacionsistecread@gmail.com">
                        facturacionsistecread@gmail.com
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </aside>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contactanos;
