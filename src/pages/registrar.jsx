import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import '../assets/css/registrar.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false, name: false });

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) setEmailError('El email es requerido');
    else if (!regex.test(value)) setEmailError('Formato de email inválido');
    else setEmailError('');
  };

  const validatePassword = (value) => {
    if (!value) setPasswordError('La contraseña es requerida');
    else if (value.length < 6) setPasswordError('Mínimo 6 caracteres');
    else setPasswordError('');
  };

  const validateName = (value) => {
    if (!value) setNameError('El nombre es requerido');
    else if (value.length < 2) setNameError('El nombre debe tener al menos 2 caracteres');
    else setNameError('');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    checkSubmitEnabled(value, password, name);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    checkSubmitEnabled(email, value, name);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
    checkSubmitEnabled(email, password, value);
  };

  const checkSubmitEnabled = (emailVal, passwordVal, nameVal) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsSubmitEnabled(regex.test(emailVal) && passwordVal.length >= 6 && nameVal.length >= 2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Registro exitoso! 🎉');
  };

  return (
    <div className="login-container">
      <div className="login-decoration"></div>
      <div className="login-decoration" style={{ animationDelay: '1s' }}></div>
      <div className="login-decoration" style={{ animationDelay: '2s' }}></div>
      <div className="login-card">
        <div className="login-header">
          <div className="icon-wrapper">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1>Regístrate</h1>
          <p>Crea tu cuenta para empezar</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label htmlFor="name">Nombre</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                onFocus={() => setIsFocused({ ...isFocused, name: true })}
                onBlur={() => setIsFocused({ ...isFocused, name: false })}
                className="login-input"
                placeholder="Tu nombre"
              />
              <User className="login-input-icon" />
            </div>
            {nameError && (
              <p className="error-message">
                <span className="error-dot"></span>
                {nameError}
              </p>
            )}
          </div>
          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                onBlur={() => setIsFocused({ ...isFocused, email: false })}
                className="login-input"
                placeholder="usuario@dominio.com"
              />
              <Mail className="login-input-icon" />
            </div>
            {emailError && (
              <p className="error-message">
                <span className="error-dot"></span>
                {emailError}
              </p>
            )}
          </div>
          <div className="login-input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setIsFocused({ ...isFocused, password: true })}
                onBlur={() => setIsFocused({ ...isFocused, password: false })}
                className="login-input"
                placeholder="••••••••"
              />
              <Lock className="login-input-icon" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && (
              <p className="error-message">
                <span className="error-dot"></span>
                {passwordError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isSubmitEnabled}
            className="login-button"
          >
            {isSubmitEnabled ? 'Registrarse' : 'Completa los campos'}
          </button>
        </form>
        <div className="login-separator">
          <span>o</span>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="login-link">
              Inicia sesión aquí
            </a>
          </p>
        </div>
        <div className="login-footer">
          Protegemos tu información con encriptación de nivel empresarial 🔒
        </div>
      </div>
    </div>
  );
};

export default Registrar;