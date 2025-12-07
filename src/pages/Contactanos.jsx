// src/pages/Contactanos.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Contactanos = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("⚠️ Debes iniciar sesión para enviar un mensaje");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    setStatus("");

    try {
      console.log("📤 Enviando:", formData);

      const response = await fetch("/api/contacto.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("📥 Status:", response.status);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("❌ Respuesta no es JSON:", text);
        throw new Error("El servidor no devolvió JSON válido");
      }

      const result = await response.json();
      console.log("✅ Respuesta:", result);

      if (result.success) {
        setStatus("✅ " + result.message);
        setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
      } else {
        setStatus("❌ Error: " + result.error);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setStatus("❌ Error de conexión: " + error.message);
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
                sugerencia o problema que tengas.
              </p>

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

              {status && (
                <p
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem",
                    backgroundColor: status.includes("✅")
                      ? "#d4edda"
                      : "#f8d7da",
                    color: status.includes("✅") ? "#155724" : "#721c24",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  {status}
                </p>
              )}
            </article>

            <aside>
              <h3>Otras formas de contacto</h3>
              <ul>
                <li>
                  <strong>Correo:</strong>
                  <a href="mailto:sistecread.info@gmail.com">
                    sistecread.info@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Teléfono:</strong>
                  <a href="tel:+529611234567">+52 (961) 123-4567</a>
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