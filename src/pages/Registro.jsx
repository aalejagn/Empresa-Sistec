import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import '../assets/css/auth.css';
import { useAuth } from '../components/AuthContext';  // ← AÑADIDO
import LoginFooter from '../components/LoginFooter'; 

const Registrar = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false, name: false });

  const { register } = useAuth();  // ← AÑADIDO para usar el contexto

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const validateName = (value) => {
    if (!value) {
      setNameError('El nombre es requerido');
      setNameValid(false);
      return false;
    } else if (value.length < 2) {
      setNameError('El nombre debe tener al menos 2 caracteres');
      setNameValid(false);
      return false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
      setNameError('El nombre solo puede contener letras');
      setNameValid(false);
      return false;
    } else {
      setNameError('');
      setNameValid(true);
      return true;
    }
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('El email es requerido');
      setEmailValid(false);
      return false;
    } else if (!regex.test(value)) {
      setEmailError('Formato de email inválido (ejemplo: usuario@dominio.com)');
      setEmailValid(false);
      return false;
    } else {
      setEmailError('');
      setEmailValid(true);
      return true;
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('La contraseña es requerida');
      setPasswordValid(false);
      return false;
    } else if (value.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      setPasswordValid(false);
      return false;
    } else if (!/[A-Za-z]/.test(value)) {
      setPasswordError('La contraseña debe contener al menos una letra');
      setPasswordValid(false);
      return false;
    } else if (!/[0-9]/.test(value)) {
      setPasswordError('La contraseña debe contener al menos un número');
      setPasswordValid(false);
      return false;
    } else {
      setPasswordError('');
      setPasswordValid(true);
      return true;
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const isValid = validateName(value);
    checkSubmitEnabled(isValid, emailValid, passwordValid);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    checkSubmitEnabled(nameValid, isValid, passwordValid);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const isValid = validatePassword(value);
    checkSubmitEnabled(nameValid, emailValid, isValid);
  };

  const checkSubmitEnabled = (nameIsValid, emailIsValid, passwordIsValid) => {
    setIsSubmitEnabled(nameIsValid && emailIsValid && passwordIsValid);
  };

  const handleNameBlur = () => {
    setTouched({ ...touched, name: true });
    validateName(name);
  };

  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
    validateEmail(email);
  };

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
    validatePassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitEnabled) {
      await register(name, email, password);  // ← CAMBIO: Usa fetch real desde contexto
    }
  };

  return (
    <div className="login-container">
      <div className="login-decoration"></div>
      <div className="login-decoration" style={{ animationDelay: '1s' }}></div>
      <div className="login-decoration" style={{ animationDelay: '2s' }}></div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-wrapper">
            <h2 className="login-logo-text">SISTEC READ</h2>
          </div>
          <h1 className="login-title">Crear Cuenta</h1>
          <p className="login-subtitle">Regístrate para comenzar tu aventura de lectura</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Campo de Nombre */}
          <div className="login-input-group">
            <label htmlFor="name" className="login-label">
              Nombre Completo <span className="login-required">*</span>
            </label>
            <div className="login-input-wrapper">
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                className={`login-input ${
                  touched.name ? (nameValid ? 'valid' : nameError ? 'error' : '') : ''
                }`}
                placeholder="Ingresa tu nombre completo"
              />
              <User 
                className="login-input-icon"
                style={{ color: nameValid ? '#5fb4b7' : '#999' }}
              />
              {touched.name && nameValid && (
                <CheckCircle 
                  className="login-valid-icon"
                  style={{ color: '#5fb4b7' }}
                />
              )}
              {touched.name && nameError && (
                <AlertCircle 
                  className="login-error-icon"
                  style={{ color: '#ef4444' }}
                />
              )}
            </div>
            {touched.name && nameError && (
              <p className="login-error-message">
                <span className="login-error-dot"></span>
                {nameError}
              </p>
            )}
            {touched.name && nameValid && (
              <p className="login-success-message">
                <span className="login-success-dot"></span>
                Nombre válido ✓
              </p>
            )}
          </div>

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
                  touched.email ? (emailValid ? 'valid' : emailError ? 'error' : '') : ''
                }`}
                placeholder="usuario@dominio.com"
              />
              <Mail 
                className="login-input-icon"
                style={{ color: emailValid ? '#5fb4b7' : '#999' }}
              />
              {touched.email && emailValid && (
                <CheckCircle 
                  className="login-valid-icon"
                  style={{ color: '#5fb4b7' }}
                />
              )}
              {touched.email && emailError && (
                <AlertCircle 
                  className="login-error-icon"
                  style={{ color: '#ef4444' }}
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
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                className={`login-input ${
                  touched.password ? (passwordValid ? 'valid' : passwordError ? 'error' : '') : ''
                }`}
                placeholder="••••••••"
              />
              <Lock 
                className="login-input-icon"
                style={{ color: passwordValid ? '#5fb4b7' : '#999' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {touched.password && passwordValid && (
                <CheckCircle 
                  className="login-valid-icon-password"
                  style={{ color: '#5fb4b7' }}
                />
              )}
              {touched.password && passwordError && (
                <AlertCircle 
                  className="login-error-icon-password"
                  style={{ color: '#ef4444' }}
                />
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
            className={`login-button ${isSubmitEnabled ? 'enabled' : 'disabled'}`}
          >
            {isSubmitEnabled ? '✓ Crear Cuenta' : '⚠ Completa todos los campos correctamente'}
          </button>

          {/* Indicador de estado */}
          <div className="login-status-indicator">
            <div className="login-status-item">
              <div className={`login-status-dot ${nameValid ? 'active' : ''}`}></div>
              <span className={`login-status-text ${nameValid ? 'active' : ''}`}>
                Nombre
              </span>
            </div>
            <div className="login-status-item">
              <div className={`login-status-dot ${emailValid ? 'active' : ''}`}></div>
              <span className={`login-status-text ${emailValid ? 'active' : ''}`}>
                Email
              </span>
            </div>
            <div className="login-status-item">
              <div className={`login-status-dot ${passwordValid ? 'active' : ''}`}></div>
              <span className={`login-status-text ${passwordValid ? 'active' : ''}`}>
                Contraseña
              </span>
            </div>
          </div>
        </form>

        <div className="login-separator">
          <span className="login-separator-text">o</span>
        </div>

        <div className="login-link-container">
          <p className="login-register-text">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="login-link">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
      <LoginFooter />
    </div>
  );
};

export default Registrar;