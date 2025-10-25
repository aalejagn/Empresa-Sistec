// src/pages/Contactanos.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';

function Contactanos() {
  const [formData, setFormData] = useState({ nombre: '', email: '', tipoConsulta: '', mensaje: '' });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.match(/^[A-Za-z\s]{2,50}$/)) newErrors.nombre = 'Solo letras y espacios, 2-50 caracteres';
    if (!formData.email.includes('@')) newErrors.email = 'Correo inválido';
    if (!formData.tipoConsulta) newErrors.tipoConsulta = 'Selecciona un tipo';
    if (formData.mensaje.length > 500) newErrors.mensaje = 'Máximo 500 caracteres';
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      alert('Mensaje enviado');
    }
  };

  return (
    <div>
      <Header />
      <main className="container">
        <section className="contact-section">
          <h1 className="page-title">Contáctanos</h1>
          <article>
            <h2 className="categoria-titulo">Envíanos tu consulta</h2>
            <p>En SISTEC READ, nuestro compromiso es conectar a los lectores con los libros que aman. Completa el formulario para cualquier consulta, sugerencia o seguimiento de pedidos. ¡Te responderemos pronto!</p>
            <form onSubmit={handleSubmit} className="contact-form">
              <label htmlFor="nombre">Nombre completo:</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ingresa tu nombre" required />
              {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre}</p>}
              <label htmlFor="email">Correo electrónico:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Ingresa tu correo" required />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              <label htmlFor="tipo-consulta">Tipo de consulta:</label>
              <select id="tipo-consulta" name="tipoConsulta" value={formData.tipoConsulta} onChange={handleChange} required>
                <option value="" disabled>Selecciona una opción</option>
                <option value="informacion">Información sobre libros</option>
                <option value="pedidos">Seguimiento de pedidos</option>
                <option value="sugerencias">Sugerencias</option>
                <option value="otro">Otro</option>
              </select>
              {errors.tipoConsulta && <p style={{ color: 'red' }}>{errors.tipoConsulta}</p>}
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea id="mensaje" name="mensaje" rows="5" value={formData.mensaje} onChange={handleChange} placeholder="Escribe tu mensaje aquí" required />
              {errors.mensaje && <p style={{ color: 'red' }}>{errors.mensaje}</p>}
              <button type="submit" className="btn btn-primary" disabled={!isValid}>Enviar</button>
            </form>
          </article>
          <aside>
            <h3>Otras formas de contacto</h3>
            <ul>
              <li><strong>Correo:</strong> <a href="#">infosistecread@gmail.com</a></li>
              <li><strong>Teléfono:</strong> <a href="#">+52 (961) 123-4567</a></li>
              <li><strong>Contacto por áreas:</strong>
                <ul>
                  <li><strong>Ventas:</strong> <a href="#">ventassistecread@gmail.com</a></li>
                  <li><strong>Soporte técnico:</strong> <a href="#">soportesistecread@gmail.com</a></li>
                  <li><strong>Facturación:</strong> <a href="#">facturacionsistecread@.com</a></li>
                </ul>
              </li>
            </ul>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Contactanos;