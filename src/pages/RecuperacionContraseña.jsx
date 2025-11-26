// src/pages/RecuperarContrasena.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import "../assets/css/auth.css";
import LoginFooter from "../components/LoginFooter";
import { useAuth } from "../components/AuthContext";

const Recuperacion_Contraseña = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { API_URL } = useAuth(); // Obtener la URL del contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(token ? 2 : 1);

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  // ============== PASO 1: Enviar email de recuperación ==============
  const handleForgot = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "forgot_password", 
          email 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setMessage("📧 " + data.message);
        setEmail(""); // Limpiar campo
      } else {
        setError("❌ " + data.error);
      }
    } catch (err) {
      console.error('Error completo:', err);
      setError("❌ Error de conexión con el servidor. Verifica que PHP esté corriendo en: " + API_URL);
    } finally {
      setLoading(false);
    }
  };

  // ============== PASO 2: Cambiar contraseña con token ==============
  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validaciones
    if (password !== confirmPassword) {
      setError("❌ Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("❌ La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("❌ La contraseña debe contener letras y números");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "reset_password", 
          token, 
          password 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setMessage("✅ " + data.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("❌ " + data.error);
      }
    } catch (err) {
      console.error('Error completo:', err);
      setError("❌ Error de conexión con el servidor. Verifica que PHP esté corriendo en: " + API_URL);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-decoration"></div>
      <div className="login-decoration" style={{ animationDelay: "1s" }}></div>
      <div className="login-decoration" style={{ animationDelay: "2s" }}></div>

      <div className="login-card-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-logo-text">SISTEC READ</h2>
            <h1 className="login-title">
              {step === 1 ? "Recuperar Contraseña" : "Nueva Contraseña"}
            </h1>
            <p className="login-subtitle">
              {step === 1
                ? "Ingresa tu correo para recibir el código de recuperación"
                : "Ingresa el código de 6 dígitos que recibiste por correo"}
            </p>
          </div>

          {/* ============== PASO 1: Pedir email ============== */}
          {step === 1 && (
            <form onSubmit={handleForgot} className="login-form">
              <div className="login-input-group">
                <label className="login-label">
                  Correo Electrónico <span className="login-required">*</span>
                </label>
                <div className="login-input-wrapper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    placeholder="tucorreo@ejemplo.com"
                    required
                    disabled={loading}
                  />
                  <Mail className="login-input-icon" />
                </div>
              </div>

              <button 
                type="submit" 
                className={`login-button ${loading ? 'disabled' : 'enabled'}`}
                disabled={loading}
              >
                {loading ? '⏳ Enviando...' : '📧 Enviar código de recuperación'}
              </button>
            </form>
          )}

          {/* ============== PASO 2: Nueva contraseña ============== */}
          {step === 2 && (
            <form onSubmit={handleReset} className="login-form">
              <div className="login-input-group">
                <label className="login-label">Código de verificación (6 dígitos)</label>
                <div className="login-input-wrapper">
                  <input
                    type="text"
                    value={token}
                    readOnly
                    className="login-input"
                    style={{ 
                      background: "#f1f5f9", 
                      color: "#64748b",
                      cursor: "not-allowed",
                      fontFamily: "monospace",
                      fontSize: "18px",
                      letterSpacing: "3px",
                      textAlign: "center"
                    }}
                  />
                  <CheckCircle className="login-input-icon" style={{ color: "#5DBFB3" }} />
                </div>
              </div>

              <div className="login-input-group">
                <label className="login-label">
                  Nueva Contraseña <span className="login-required">*</span>
                </label>
                <div className="login-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                  <Lock className="login-input-icon" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="login-password-toggle"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="login-input-group">
                <label className="login-label">
                  Confirmar Contraseña <span className="login-required">*</span>
                </label>
                <div className="login-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="login-input"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                  <Lock className="login-input-icon" />
                </div>
              </div>

              <button 
                type="submit" 
                className={`login-button ${loading ? 'disabled' : 'enabled'}`}
                disabled={loading}
              >
                {loading ? '⏳ Actualizando...' : '🔒 Cambiar Contraseña'}
              </button>
            </form>
          )}

          {/* Mensajes de éxito y error */}
          {message && (
            <div style={{
              padding: '12px',
              marginTop: '15px',
              background: '#d1fae5',
              border: '1px solid #5DBFB3',
              borderRadius: '8px',
              color: '#065f46',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              {message}
            </div>
          )}

          {error && (
            <div style={{
              padding: '12px',
              marginTop: '15px',
              background: '#fee2e2',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              color: '#991b1b',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              {error}
            </div>
          )}

          <div className="login-link-container" style={{ marginTop: '20px' }}>
            <a href="/login" className="login-link">
              ← Volver al inicio de sesión
            </a>
          </div>
        </div>
      </div>

      <LoginFooter />
    </div>
  );
};

export default Recuperacion_Contraseña;