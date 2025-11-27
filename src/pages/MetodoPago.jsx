// src/pages/MetodoPago.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";

const MetodoPago = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  let datosEnvio = {};
  try {
    const saved = localStorage.getItem("datosEnvio");
    datosEnvio = saved ? JSON.parse(saved) : {};
  } catch (e) {
    console.error("Error al leer datosEnvio:", e);
  }

  if (!datosEnvio.nombre || !datosEnvio.tipoEntrega) {
    navigate("/checkout");
    return null;
  }

  const [formData, setFormData] = useState({
    metodoPago: "",
    tarjeta: { numero: "", expiry: "", cvv: "", nombre: "" },
    paypalEmail: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const IVA_RATE = 0.16;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  const iva = subtotal * IVA_RATE;
  const total = subtotal + iva;

  // Validaciones
  const validateField = (name, value) => {
    let error = "";

    if (name === "metodoPago" && !value) {
      error = "Selecciona un método de pago";
    }

    if (["debito", "credito"].includes(formData.metodoPago)) {
      switch (name) {
        case "numero":
          if (!value) {
            error = "El número de tarjeta es obligatorio";
          } else if (!/^\d{16}$/.test(value.replace(/\s/g, ""))) {
            error = "Debe tener 16 dígitos";
          } else if (!validarLuhn(value.replace(/\s/g, ""))) {
            error = "Número de tarjeta inválido";
          }
          break;

        case "nombre":
          if (!value.trim()) {
            error = "El nombre es obligatorio";
          } else if (value.trim().length < 3) {
            error = "Ingresa el nombre completo";
          }
          break;

        case "expiry":
          if (!value) {
            error = "La fecha de expiración es obligatoria";
          } else if (!/^\d{2}\/\d{2}$/.test(value)) {
            error = "Formato: MM/AA";
          } else {
            const [mes, año] = value.split("/").map(Number);
            const añoCompleto = 2000 + año;
            const fechaExpiracion = new Date(añoCompleto, mes - 1);
            if (fechaExpiracion < new Date()) {
              error = "Tarjeta expirada";
            }
            if (mes < 1 || mes > 12) {
              error = "Mes inválido";
            }
          }
          break;

        case "cvv":
          if (!value) {
            error = "El CVV es obligatorio";
          } else if (!/^\d{3,4}$/.test(value)) {
            error = "Debe tener 3 o 4 dígitos";
          }
          break;
      }
    }

    if (formData.metodoPago === "paypal" && name === "paypalEmail") {
      if (!value) {
        error = "El correo de PayPal es obligatorio";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Ingresa un correo válido";
      }
    }

    return error;
  };

  // Algoritmo de Luhn para validar tarjetas
  const validarLuhn = (numero) => {
    let suma = 0;
    let alternar = false;

    for (let i = numero.length - 1; i >= 0; i--) {
      let digito = parseInt(numero.charAt(i), 10);

      if (alternar) {
        digito *= 2;
        if (digito > 9) digito -= 9;
      }

      suma += digito;
      alternar = !alternar;
    }

    return suma % 10 === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleTarjetaChange = (e) => {
    let { name, value } = e.target;

    // Formatear número de tarjeta con espacios
    if (name === "numero") {
      value = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    }

    // Formatear fecha de expiración
    if (name === "expiry") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substr(0, 5);
    }

    setFormData((prev) => ({
      ...prev,
      tarjeta: { ...prev.tarjeta, [name]: value },
    }));

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
    const { metodoPago, tarjeta, paypalEmail } = formData;

    newErrors.metodoPago = validateField("metodoPago", metodoPago);

    if (["debito", "credito"].includes(metodoPago)) {
      newErrors.numero = validateField("numero", tarjeta.numero);
      newErrors.nombre = validateField("nombre", tarjeta.nombre);
      newErrors.expiry = validateField("expiry", tarjeta.expiry);
      newErrors.cvv = validateField("cvv", tarjeta.cvv);
    }

    if (metodoPago === "paypal") {
      newErrors.paypalEmail = validateField("paypalEmail", paypalEmail);
    }

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v)
    );

    setErrors(filteredErrors);
    setTouched({
      metodoPago: true,
      numero: true,
      nombre: true,
      expiry: true,
      cvv: true,
      paypalEmail: true,
    });

    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    const ventaData = {
      items: cart.map((item) => ({
        id: item.id,
        precio: parseFloat(item.precio),
        cantidad: item.cantidad,
      })),
      usuario_id: user ? user.id : null,
      nombre: datosEnvio.nombre || "",
      email: datosEnvio.email || "",
      telefono: datosEnvio.telefono || "",
      cp: datosEnvio.cp || "",
      tipoEntrega: datosEnvio.tipoEntrega || "",
      direccion: datosEnvio.direccion || null,
      descripcionCasa: datosEnvio.descripcionCasa || null,
      ciudad: datosEnvio.ciudad || null,
      estado: datosEnvio.estado || null,
      metodoPago: formData.metodoPago || "",
      total: parseFloat(total.toFixed(2)),
    };

    fetch("/api/ventas.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ventaData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsProcessing(false);
        if (data.success) {
          if (data.codigo_oxxo) {
            setSuccessMessage(
              `¡Pago pendiente con Oxxo! Código: ${data.codigo_oxxo}. ${data.mensaje_oxxo}`
            );
          } else {
            setSuccessMessage(
              "¡Compra exitosa! Te enviaremos un correo con los detalles."
            );
          }
          clearCart();
          localStorage.removeItem("datosEnvio");
          setTimeout(() => navigate("/carrito"), 3000);
        } else {
          setErrors({ submit: data.error || "Error al procesar el pago" });
        }
      })
      .catch(() => {
        setIsProcessing(false);
        setErrors({ submit: "Error de conexión. Intenta nuevamente." });
      });
  };

  return (
    <>
      <Header />
      <main className="checkout-main">
        <div className="container">
          <h1 className="page-title">Método de Pago</h1>

          <div className="checkout-steps">
            <div className="step">
              <span className="step-number">1</span>
              <span className="step-label">Datos de Envío</span>
            </div>
            <div className="step-line active"></div>
            <div className="step active">
              <span className="step-number">2</span>
              <span className="step-label">Método de Pago</span>
            </div>
          </div>

          {successMessage && (
            <div className="success-banner">
              <i className="fas fa-check-circle"></i>
              <span>{successMessage}</span>
            </div>
          )}

          {errors.submit && (
            <div className="error-banner">
              <i className="fas fa-exclamation-triangle"></i>
              <span>{errors.submit}</span>
            </div>
          )}

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

              <div className="envio-resumen">
                <h3>Envío</h3>
                <p>
                  <strong>{datosEnvio.nombre}</strong>
                </p>
                <p>
                  {datosEnvio.tipoEntrega === "retiro"
                    ? "Retiro en tienda"
                    : datosEnvio.direccion}
                </p>
                <p>
                  {datosEnvio.email} | {datosEnvio.telefono}
                </p>
              </div>
            </div>

            <div className="checkout-form">
              <div className="form-section">
                <h2>Elige tu método de pago</h2>

                <div className="form-field">
                  <select
                    name="metodoPago"
                    value={formData.metodoPago}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={
                      errors.metodoPago && touched.metodoPago
                        ? "input-error"
                        : ""
                    }
                  >
                    <option value="">Selecciona un método</option>
                    <option value="debito">Tarjeta de Débito</option>
                    <option value="credito">Tarjeta de Crédito</option>
                    <option value="paypal">PayPal</option>
                    <option value="oxxo">Oxxo</option>
                  </select>
                  {errors.metodoPago && touched.metodoPago && (
                    <span className="error-message">
                      <i className="fas fa-exclamation-circle"></i>{" "}
                      {errors.metodoPago}
                    </span>
                  )}
                </div>

                {["debito", "credito"].includes(formData.metodoPago) && (
                  <div className="tarjeta-form">
                    <div className="form-field">
                      <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del titular"
                        value={formData.tarjeta.nombre}
                        onChange={handleTarjetaChange}
                        onBlur={handleBlur}
                        className={
                          errors.nombre && touched.nombre ? "input-error" : ""
                        }
                      />
                      {errors.nombre && touched.nombre && (
                        <span className="error-message">
                          <i className="fas fa-exclamation-circle"></i>{" "}
                          {errors.nombre}
                        </span>
                      )}
                    </div>

                    <div className="form-field">
                      <input
                        type="text"
                        name="numero"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        value={formData.tarjeta.numero}
                        onChange={handleTarjetaChange}
                        onBlur={handleBlur}
                        className={
                          errors.numero && touched.numero ? "input-error" : ""
                        }
                      />
                      {errors.numero && touched.numero && (
                        <span className="error-message">
                          <i className="fas fa-exclamation-circle"></i>{" "}
                          {errors.numero}
                        </span>
                      )}
                    </div>

                    <div className="tarjeta-row">
                      <div className="form-field">
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/AA"
                          maxLength="5"
                          value={formData.tarjeta.expiry}
                          onChange={handleTarjetaChange}
                          onBlur={handleBlur}
                          className={
                            errors.expiry && touched.expiry ? "input-error" : ""
                          }
                        />
                        {errors.expiry && touched.expiry && (
                          <span className="error-message">
                            <i className="fas fa-exclamation-circle"></i>{" "}
                            {errors.expiry}
                          </span>
                        )}
                      </div>
                      <div className="form-field">
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          maxLength="4"
                          value={formData.tarjeta.cvv}
                          onChange={handleTarjetaChange}
                          onBlur={handleBlur}
                          className={
                            errors.cvv && touched.cvv ? "input-error" : ""
                          }
                        />
                        {errors.cvv && touched.cvv && (
                          <span className="error-message">
                            <i className="fas fa-exclamation-circle"></i>{" "}
                            {errors.cvv}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="nota">
                      <i className="fas fa-lock"></i> Simulación: no se procesan
                      pagos reales
                    </p>
                  </div>
                )}

                {formData.metodoPago === "paypal" && (
                  <div className="form-field">
                    <input
                      type="email"
                      name="paypalEmail"
                      placeholder="tu@email.com"
                      value={formData.paypalEmail}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={
                        errors.paypalEmail && touched.paypalEmail
                          ? "input-error"
                          : ""
                      }
                    />
                    {errors.paypalEmail && touched.paypalEmail && (
                      <span className="error-message">
                        <i className="fas fa-exclamation-circle"></i>{" "}
                        {errors.paypalEmail}
                      </span>
                    )}
                  </div>
                )}

                {formData.metodoPago === "oxxo" && (
                  <div className="oxxo-info">
                    <i className="fas fa-store"></i>
                    <div>
                      <p>
                        Al confirmar, generaremos un código de pago para Oxxo.
                      </p>
                      <p className="nota">Válido por 48 horas.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <Link to="/checkout" className="btn btn-back">
                  Atrás
                </Link>
                <button
                  className="btn btn-next"
                  onClick={handleSubmit}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Procesando...
                    </>
                  ) : (
                    `Pagar $${total.toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          </div>

          <Link to="/carrito" className="btn btn-continue">
            Volver al Carrito
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MetodoPago;
