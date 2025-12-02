// src/pages/Checkout.jsx
import React, { useEffectEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";

const Checkout = () => {
  const { cart } = useCart();
  const {user} = useAuth()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    cp: "",
    tipoEntrega: "domicilio",
    direccion: "",
    descripcionCasa: "",
    ciudad: "",
    estado: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const IVA_RATE = 0.16;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  const iva = subtotal * IVA_RATE;
  const total = subtotal + iva;

  
  // ← PROTECCIÓN: si no está logueado lo saca
  useEffect(() => {
    if (!user) {
      alert("Debes iniciar sesión para continuar con la compra");
      navigate("/https://empresa-sistec-t5fv.vercel.app/login");
    }
  }, [user, navigate]);

  // Validaciones
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "nombre":
        if (!value.trim()) {
          error = "El nombre es obligatorio";
        } else if (value.trim().length < 3) {
          error = "El nombre debe tener al menos 3 caracteres";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          error = "Solo se permiten letras";
        }
        break;

      case "email":
        if (!value) {
          error = "El correo es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Ingresa un correo válido";
        }
        break;

      case "telefono":
        if (!value) {
          error = "El teléfono es obligatorio";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Debe tener 10 dígitos";
        }
        break;

      case "cp":
        if (!value) {
          error = "El código postal es obligatorio";
        } else if (!/^\d{5}$/.test(value)) {
          error = "Debe tener 5 dígitos";
        }
        break;

      case "direccion":
        if (formData.tipoEntrega === "domicilio" && !value.trim()) {
          error = "La dirección es obligatoria";
        } else if (formData.tipoEntrega === "domicilio" && value.trim().length < 10) {
          error = "Ingresa una dirección completa";
        }
        break;

      case "ciudad":
        if (formData.tipoEntrega === "domicilio" && !value.trim()) {
          error = "La ciudad es obligatoria";
        }
        break;

      case "estado":
        if (formData.tipoEntrega === "domicilio" && !value) {
          error = "Selecciona un estado";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validar en tiempo real solo si el campo ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = ["nombre", "email", "telefono", "cp"];

    if (formData.tipoEntrega === "domicilio") {
      fieldsToValidate.push("direccion", "ciudad", "estado");
    }

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched(
      fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem("datosEnvio", JSON.stringify(formData));
      navigate("/metodo-pago");
    }
  };

  return (
    <>
      <Header />
      <main className="checkout-main">
        <div className="container">
          <h1 className="page-title">Finalizar Compra</h1>

          <div className="checkout-steps">
            <div className="step active">
              <span className="step-number">1</span>
              <span className="step-label">Datos de Envío</span>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <span className="step-number">2</span>
              <span className="step-label">Método de Pago</span>
            </div>
          </div>

          <div className="checkout-content">
            <div className="checkout-summary">
              <h2>Resumen</h2>
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>
                      {item.titulo} x{item.cantidad}
                    </span>
                    <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>IVA (16%):</span>
                <span>${iva.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="checkout-form">
              <div className="form-section">
                <h2>Datos de Envío</h2>

                <div className="form-row">
                  <div className="form-field">
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre completo"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.nombre && touched.nombre ? "input-error" : ""}
                    />
                    {errors.nombre && touched.nombre && (
                      <span className="error-message">
                        <i className="fas fa-exclamation-circle"></i> {errors.nombre}
                      </span>
                    )}
                  </div>

                  <div className="form-field">
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email ? "input-error" : ""}
                    />
                    {errors.email && touched.email && (
                      <span className="error-message">
                        <i className="fas fa-exclamation-circle"></i> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <input
                      type="tel"
                      name="telefono"
                      placeholder="Teléfono (10 dígitos)"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      maxLength="10"
                      className={errors.telefono && touched.telefono ? "input-error" : ""}
                    />
                    {errors.telefono && touched.telefono && (
                      <span className="error-message">
                        <i className="fas fa-exclamation-circle"></i> {errors.telefono}
                      </span>
                    )}
                  </div>

                  <div className="form-field">
                    <input
                      type="text"
                      name="cp"
                      placeholder="Código Postal"
                      value={formData.cp}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      maxLength="5"
                      className={errors.cp && touched.cp ? "input-error" : ""}
                    />
                    {errors.cp && touched.cp && (
                      <span className="error-message">
                        <i className="fas fa-exclamation-circle"></i> {errors.cp}
                      </span>
                    )}
                  </div>
                </div>

                <div className="entrega-opciones">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="tipoEntrega"
                      value="domicilio"
                      checked={formData.tipoEntrega === "domicilio"}
                      onChange={handleInputChange}
                    />
                    <span>Envío a domicilio</span>
                  </label>

                  <label className="radio-label">
                    <input
                      type="radio"
                      name="tipoEntrega"
                      value="retiro"
                      checked={formData.tipoEntrega === "retiro"}
                      onChange={handleInputChange}
                    />
                    <span>Retirar en punto de entrega</span>
                  </label>
                </div>

                {formData.tipoEntrega === "domicilio" && (
                  <>
                    <div className="form-field">
                      <textarea
                        name="direccion"
                        placeholder="Calle, número exterior/interior, colonia"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows="2"
                        className={errors.direccion && touched.direccion ? "input-error" : ""}
                      />
                      {errors.direccion && touched.direccion && (
                        <span className="error-message">
                          <i className="fas fa-exclamation-circle"></i> {errors.direccion}
                        </span>
                      )}
                    </div>

                    <textarea
                      name="descripcionCasa"
                      placeholder="Descripción de la casa (color, entre qué calles, referencias)"
                      value={formData.descripcionCasa}
                      onChange={handleInputChange}
                      rows="2"
                    />

                    <div className="form-row">
                      <div className="form-field">
                        <input
                          type="text"
                          name="ciudad"
                          placeholder="Ciudad"
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={errors.ciudad && touched.ciudad ? "input-error" : ""}
                        />
                        {errors.ciudad && touched.ciudad && (
                          <span className="error-message">
                            <i className="fas fa-exclamation-circle"></i> {errors.ciudad}
                          </span>
                        )}
                      </div>

                      <div className="form-field">
                        <select
                          name="estado"
                          value={formData.estado}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={errors.estado && touched.estado ? "input-error" : ""}
                        >
                          <option value="">Estado</option>
                          <option value="CDMX">Ciudad de México</option>
                          <option value="JAL">Jalisco</option>
                          <option value="NL">Nuevo León</option>
                          <option value="GTO">Guanajuato</option>
                          <option value="PUE">Puebla</option>
                          <option value="VER">Veracruz</option>
                          <option value="QRO">Querétaro</option>
                          <option value="CHIH">Chihuahua</option>
                          <option value="BC">Baja California</option>
                          <option value="SIN">Sinaloa</option>
                          <option value="CHIS">Chiapas</option>
                        </select>
                        {errors.estado && touched.estado && (
                          <span className="error-message">
                            <i className="fas fa-exclamation-circle"></i> {errors.estado}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {formData.tipoEntrega === "retiro" && (
                  <div className="retiro-info">
                    <i className="fas fa-store"></i>
                    <div>
                      <strong>Librería Central - Punto de Entrega</strong>
                      <p>
                        Casa de Gopar Toledo, Nardo, Jardín Corona Fovissste II,
                        Tuxtla Gutiérrez, Chiapas
                      </p>
                      <p>Horario: Lunes a Sábado 9:00 - 18:00</p>
                      <p className="nota-retiro">
                        Te avisaremos por correo cuando tu pedido esté listo
                        (máx. 48 hrs).
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button className="btn btn-next" onClick={handleSubmit}>
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          <Link to="/carrito" className="btn btn-continue">
             <i className="fas fa-arrow-left"> </i> Volver al Carrito
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;