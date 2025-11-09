import React, { useState, useEffect } from "react"; // ← Agregar useEffect aquí
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "../assets/css/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  // ========== NUEVO: Eliminar padding del body cuando se monta el componente ==========
  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);
  // ====================================================================================

  // Validación de email con regex
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!value) {
      setEmailError("El email es requerido");
      setEmailValid(false);
      return false;
    } else if (!regex.test(value)) {
      setEmailError("Formato de email inválido (ejemplo: usuario@dominio.com)");
      setEmailValid(false);
      return false;
    } else {
      setEmailError("");
      setEmailValid(true);
      return true;
    }
  };

  // Validación de contraseña con requisitos
  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("La contraseña es requerida");
      setPasswordValid(false);
      return false;
    } else if (value.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      setPasswordValid(false);
      return false;
    } else if (!/[A-Za-z]/.test(value)) {
      setPasswordError("La contraseña debe contener al menos una letra");
      setPasswordValid(false);
      return false;
    } else {
      setPasswordError("");
      setPasswordValid(true);
      return true;
    }
  };

  // Manejar cambio de email
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    checkSubmitEnabled(isValid, passwordValid);
  };

  // Manejar cambio de contraseña
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const isValid = validatePassword(value);
    checkSubmitEnabled(emailValid, isValid);
  };

  // Verificar si el botón debe estar habilitado
  const checkSubmitEnabled = (emailIsValid, passwordIsValid) => {
    setIsSubmitEnabled(emailIsValid && passwordIsValid);
  };

  // Manejar blur (cuando el usuario sale del campo)
  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
    validateEmail(email);
  };

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
    validatePassword(password);
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitEnabled) {
      alert(
        `¡Bienvenido a SISTEC READ! 🎉\n\nEmail: ${email}\n\nIniciando sesión...`
      );
      // Aquí iría la lógica de autenticación real
    }
  };

  return (
    <div className="login-container">
      <div className="login-decoration"></div>
      <div className="login-decoration" style={{ animationDelay: "1s" }}></div>
      <div className="login-decoration" style={{ animationDelay: "2s" }}></div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-wrapper">
            <div className="login-logo-container">
              <img
                src="../assets/Images/logo.png"
                alt="SISTEC READ"
                className="login-logo-img"
              />
            </div>
            <h2 className="login-logo-text">SISTEC READ</h2>
          </div>
          <h1 className="login-title">Iniciar Sesión</h1>
          <p className="login-subtitle">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Campo de Email */}
          <div className="login-input-group">
            <label htmlFor="email" className="login-label">
              Correo Electrónico <span className="login-required">*</span>
            </label>
            <div className="login-input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`login-input ${
                  touched.email
                    ? emailValid
                      ? "valid"
                      : emailError
                      ? "error"
                      : ""
                    : ""
                }`}
                placeholder="usuario@dominio.com"
              />
              <Mail
                className="login-input-icon"
                style={{ color: emailValid ? "#5fb4b7" : "#999" }}
              />
              {touched.email && emailValid && (
                <CheckCircle
                  className="login-valid-icon"
                  style={{ color: "#5fb4b7" }}
                />
              )}
              {touched.email && emailError && (
                <AlertCircle
                  className="login-error-icon"
                  style={{ color: "#ef4444" }}
                />
              )}
            </div>
            {touched.email && emailError && (
              <p className="login-error-message">
                <span className="login-error-dot"></span>
                {emailError}
              </p>
            )}
            {touched.email && emailValid && (
              <p className="login-success-message">
                <span className="login-success-dot"></span>
                Email válido ✓
              </p>
            )}
          </div>

          {/* Campo de Contraseña */}
          <div className="login-input-group">
            <label htmlFor="password" className="login-label">
              Contraseña <span className="login-required">*</span>
            </label>
            <div className="login-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                className={`login-input ${
                  touched.password
                    ? passwordValid
                      ? "valid"
                      : passwordError
                      ? "error"
                      : ""
                    : ""
                }`}
                placeholder="••••••••"
              />
              <Lock
                className={`login-input-icon ${passwordValid ? "valid" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {touched.password && passwordValid && (
                <CheckCircle className="login-valid-icon-password" />
              )}
              {touched.password && passwordError && (
                <AlertCircle className="login-error-icon-password" />
              )}
            </div>
            {touched.password && passwordError && (
              <p className="login-error-message">
                <span className="login-error-dot"></span>
                {passwordError}
              </p>
            )}
            {touched.password && passwordValid && (
              <p className="login-success-message">
                <span className="login-success-dot"></span>
                Contraseña segura ✓
              </p>
            )}
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={!isSubmitEnabled}
            className={`login-button ${
              isSubmitEnabled ? "enabled" : "disabled"
            }`}
          >
            {isSubmitEnabled
              ? "✓ Iniciar Sesión"
              : "⚠ Completa los campos correctamente"}
          </button>

          {/* Indicador de estado */}
          <div className="login-status-indicator">
            <div className="login-status-item">
              <div
                className={`login-status-dot ${emailValid ? "active" : ""}`}
              ></div>
              <span
                className={`login-status-text ${emailValid ? "active" : ""}`}
              >
                Email válido
              </span>
            </div>
            <div className="login-status-item">
              <div
                className={`login-status-dot ${passwordValid ? "active" : ""}`}
              ></div>
              <span
                className={`login-status-text ${passwordValid ? "active" : ""}`}
              >
                Contraseña válida
              </span>
            </div>
          </div>
        </form>

        <div className="login-separator">
          <span className="login-separator-text">o</span>
        </div>

        <div className="login-link-container">
          <a href="#recuperar" className="login-link">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <div className="login-link-container">
          <p className="login-register-text">
            ¿No tienes cuenta?{" "}
            <a href="/registro" className="login-link">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;