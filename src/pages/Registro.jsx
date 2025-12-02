import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle, Calendar, Home, UserCheck } from 'lucide-react';
import '../assets/css/auth.css';
import { useAuth } from '../components/AuthContext';
import LoginFooter from '../components/LoginFooter';

const Registrar = () => {
  const [step, setStep] = useState(1); // Paso 1 o 2

  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [genero, setGenero] = useState('prefiero_no_decir');

  const [nombreError, setNombreError] = useState('');
  const [apellidoPaternoError, setApellidoPaternoError] = useState('');
  const [apellidoMaternoError, setApellidoMaternoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [fechaNacimientoError, setFechaNacimientoError] = useState('');
  const [direccionError, setDireccionError] = useState('');
  const [generoError, setGeneroError] = useState('');

  const [nombreValid, setNombreValid] = useState(false);
  const [apellidoPaternoValid, setApellidoPaternoValid] = useState(false);
  const [apellidoMaternoValid, setApellidoMaternoValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [fechaNacimientoValid, setFechaNacimientoValid] = useState(false);
  const [direccionValid, setDireccionValid] = useState(false);
  const [generoValid, setGeneroValid] = useState(true); // Por defecto válido

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    nombre: false, apellidoPaterno: false, apellidoMaterno: false,
    email: false, password: false, confirmPassword: false,
    fechaNacimiento: false, direccion: false, genero: false
  });

  const { register } = useAuth();

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  // Validaciones
  const validateNombre = (value) => {
    if (!value) {
      setNombreError('El nombre es requerido');
      setNombreValid(false);
      return false;
    } else if (value.length < 2) {
      setNombreError('El nombre debe tener al menos 2 caracteres');
      setNombreValid(false);
      return false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
      setNombreError('El nombre solo puede contener letras');
      setNombreValid(false);
      return false;
    } else {
      setNombreError('');
      setNombreValid(true);
      return true;
    }
  };

  const validateApellido = (value, isPaterno = true) => {
    const setterError = isPaterno ? setApellidoPaternoError : setApellidoMaternoError;
    const setterValid = isPaterno ? setApellidoPaternoValid : setApellidoMaternoValid;
    if (!value) {
      setterError('El apellido es requerido');
      setterValid(false);
      return false;
    } else if (value.length < 2) {
      setterError('El apellido debe tener al menos 2 caracteres');
      setterValid(false);
      return false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
      setterError('El apellido solo puede contener letras');
      setterValid(false);
      return false;
    } else {
      setterError('');
      setterValid(true);
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

  const validateConfirmPassword = (value) => {
    if (!value) {
      setConfirmPasswordError('Confirma la contraseña');
      setConfirmPasswordValid(false);
      return false;
    } else if (value !== password) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      setConfirmPasswordValid(false);
      return false;
    } else {
      setConfirmPasswordError('');
      setConfirmPasswordValid(true);
      return true;
    }
  };

  const validateFechaNacimiento = (value) => {
    if (!value) {
      setFechaNacimientoError('La fecha de nacimiento es requerida');
      setFechaNacimientoValid(false);
      return false;
    }
    const fechaNac = new Date(value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    if (edad < 13) {
      setFechaNacimientoError('Debes tener al menos 13 años');
      setFechaNacimientoValid(false);
      return false;
    } else {
      setFechaNacimientoError('');
      setFechaNacimientoValid(true);
      return true;
    }
  };

  const validateDireccion = (value) => {
    if (!value) {
      setDireccionError('La dirección es requerida');
      setDireccionValid(false);
      return false;
    } else if (value.length < 10) {
      setDireccionError('La dirección debe tener al menos 10 caracteres');
      setDireccionValid(false);
      return false;
    } else {
      setDireccionError('');
      setDireccionValid(true);
      return true;
    }
  };

  const validateGenero = (value) => {
    if (!value) {
      setGeneroError('El género es requerido');
      setGeneroValid(false);
      return false;
    } else {
      setGeneroError('');
      setGeneroValid(true);
      return true;
    }
  };

  // Handlers de cambio
  const handleNombreChange = (e) => {
    const value = e.target.value;
    setNombre(value);
    validateNombre(value);
    checkSubmitEnabled();
  };

  const handleApellidoPaternoChange = (e) => {
    const value = e.target.value;
    setApellidoPaterno(value);
    validateApellido(value, true);
    checkSubmitEnabled();
  };

  const handleApellidoMaternoChange = (e) => {
    const value = e.target.value;
    setApellidoMaterno(value);
    validateApellido(value, false);
    checkSubmitEnabled();
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    checkSubmitEnabled();
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    validateConfirmPassword(confirmPassword); // Revalida confirmación
    checkSubmitEnabled();
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value);
    checkSubmitEnabled();
  };

  const handleFechaNacimientoChange = (e) => {
    const value = e.target.value;
    setFechaNacimiento(value);
    validateFechaNacimiento(value);
    checkSubmitEnabled();
  };

  const handleDireccionChange = (e) => {
    const value = e.target.value;
    setDireccion(value);
    validateDireccion(value);
    checkSubmitEnabled();
  };

  const handleGeneroChange = (e) => {
    const value = e.target.value;
    setGenero(value);
    validateGenero(value);
    checkSubmitEnabled();
  };

  // Handlers de blur (para touched)
  const handleNombreBlur = () => setTouched({ ...touched, nombre: true });
  const handleApellidoPaternoBlur = () => setTouched({ ...touched, apellidoPaterno: true });
  const handleApellidoMaternoBlur = () => setTouched({ ...touched, apellidoMaterno: true });
  const handleEmailBlur = () => setTouched({ ...touched, email: true });
  const handlePasswordBlur = () => setTouched({ ...touched, password: true });
  const handleConfirmPasswordBlur = () => setTouched({ ...touched, confirmPassword: true });
  const handleFechaNacimientoBlur = () => setTouched({ ...touched, fechaNacimiento: true });
  const handleDireccionBlur = () => setTouched({ ...touched, direccion: true });
  const handleGeneroBlur = () => setTouched({ ...touched, genero: true });

  // Chequea si el botón debe habilitarse (según el paso)
  const checkSubmitEnabled = () => {
    if (step === 1) {
      setIsSubmitEnabled(nombreValid && apellidoPaternoValid && apellidoMaternoValid && emailValid && fechaNacimientoValid);
    } else {
      setIsSubmitEnabled(direccionValid && generoValid && passwordValid && confirmPasswordValid);
    }
  };

  // Manejo de "Siguiente" (valida paso 1 y pasa a paso 2)
  const handleNext = () => {
    const isStep1Valid = validateNombre(nombre) && validateApellido(apellidoPaterno, true) && 
                         validateApellido(apellidoMaterno, false) && validateEmail(email) && 
                         validateFechaNacimiento(fechaNacimiento);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  // Manejo de submit final (en paso 2)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isStep2Valid = validateDireccion(direccion) && validateGenero(genero) && 
                         validatePassword(password) && validateConfirmPassword(confirmPassword);
    if (isStep2Valid && isSubmitEnabled) {
      await register(
        nombre, apellidoPaterno, apellidoMaterno, email, password, confirmPassword, 
        fechaNacimiento, direccion, genero
      );
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
          <h1 className="login-title">Crear Cuenta - Paso {step} de 2</h1>
          <p className="login-subtitle">Regístrate para comenzar tu aventura de lectura</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {step === 1 && (
            <>
              {/* Nombre */}
              <div className="login-input-group">
                <label htmlFor="nombre" className="login-label">
                  Nombre <span className="login-required">*</span>
                </label>
                <div className="login-input-wrapper">
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={handleNombreChange}
                    onBlur={handleNombreBlur}
                    className={`login-input ${touched.nombre ? (nombreValid ? 'valid' : nombreError ? 'error' : '') : ''}`}
                    placeholder="Ingresa tu nombre"
                  />
                  <User className="login-input-icon" style={{ color: nombreValid ? '#5fb4b7' : '#999' }} />
                  {touched.nombre && nombreValid && <CheckCircle className="login-valid-icon" style={{ color: '#5fb4b7' }} />}
                  {touched.nombre && nombreError && <AlertCircle className="login-error-icon" style={{ color: '#ef4444' }} />}
                </div>
                {touched.nombre && nombreError && <p className="login-error-message"><span className="login-error-dot"></span>{nombreError}</p>}
                {touched.nombre && nombreValid && <p className="login-success-message"><span className="login-success-dot"></span>Nombre válido ✓</p>}
              </div>

              {/* Apellido Paterno */}
              <div className="login-input-group">
                <label htmlFor="apellidoPaterno" className="login-label">
                  Apellido Paterno <span className="login-required">*</span>
                </label>
                <div className="login-input-wrapper">
                  <input
                    type="text"
                    id="apellidoPaterno"
                    value={apellidoPaterno}
                    onChange={handleApellidoPaternoChange}
                    onBlur={handleApellidoPaternoBlur}
                    className={`login-input ${touched.apellidoPaterno ? (apellidoPaternoValid ? 'valid' : apellidoPaternoError ? 'error' : '') : ''}`}
                    placeholder="Ingresa tu apellido paterno"
                  />
                  <User className="login-input-icon" style={{ color: apellidoPaternoValid ? '#5fb4b7' : '#999' }} />
                  {touched.apellidoPaterno && apellidoPaternoValid && <CheckCircle className="login-valid-icon" style={{ color: '#5fb4b7' }} />}
                  {touched.apellidoPaterno && apellidoPaternoError && <AlertCircle className="login-error-icon" style={{ color: '#ef4444' }} />}
                </div>
                {touched.apellidoPaterno && apellidoPaternoError && <p className="login-error-message"><span className="login-error-dot"></span>{apellidoPaternoError}</p>}
                {touched.apellidoPaterno && apellidoPaternoValid && <p className="login-success-message"><span className="login-success-dot"></span>Apellido válido ✓</p>}
              </div>

              {/* Apellido Materno */}
              <div className="login-input-group">
                <label htmlFor="apellidoMaterno" className="login-label">
                  Apellido Materno <span className="login-required">*</span>
                </label>
                <div className="login-input-wrapper">
                  <input
                    type="text"
                    id="apellidoMaterno"
                    value={apellidoMaterno}
                    onChange={handleApellidoMaternoChange}
                    onBlur={handleApellidoMaternoBlur}
                    className={`login-input ${touched.apellidoMaterno ? (apellidoMaternoValid ? 'valid' : apellidoMaternoError ? 'error' : '') : ''}`}
                    placeholder="Ingresa tu apellido materno"
                  />
                  <User className="login-input-icon" style={{ color: apellidoMaternoValid ? '#5fb4b7' : '#999' }} />
                  {touched.apellidoMaterno && apellidoMaternoValid && <CheckCircle className="login-valid-icon" style={{ color: '#5fb4b7' }} />}
                  {touched.apellidoMaterno && apellidoMaternoError && <AlertCircle className="login-error-icon" style={{ color: '#ef4444' }} />}
                </div>
                {touched.apellidoMaterno && apellidoMaternoError && <p className="login-error-message"><span className="login-error-dot"></span>{apellidoMaternoError}</p>}
                {touched.apellidoMaterno && apellidoMaternoValid && <p className="login-success-message"><span className="login-success-dot"></span>Apellido válido ✓</p>}
              </div>

              {/* Email */}
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
                    className={`login-input ${touched.email ? (emailValid ? 'valid' : emailError ? 'error' : '') : ''}`}
                    placeholder="usuario@dominio.com"
                  />
                  <Mail className="login-input-icon" style={{ color: emailValid ? '#5fb4b7' : '#999' }} />
                  {touched.email && emailValid && <CheckCircle className="login-valid-icon" style={{ color: '#5fb4b7' }} />}
                  {touched.email && emailError && <AlertCircle className="login-error-icon" style={{ color: '#ef4444' }} />}
                </div>
                {touched.email && emailError && <p className="login-error-message"><span className="login-error-dot"></span>{emailError}</p>}
                {touched.email && emailValid && <p className="login-success-message"><span className="login-success-dot"></span>Email válido ✓</p>}
              </div>

              {/* Fecha de Nacimiento */}
              <div className="login-input-group">
                <label htmlFor="fechaNacimiento" className="login-label">
                  Fecha de Nacimiento <span className="login-required">*</span>
                </label>
                <div className="login-input-wrapper">
                  <input
                    type="date"
                    id="fechaNacimiento"
                    value={fechaNacimiento}
                    onChange={handleFechaNacimientoChange}
                    onBlur={handleFechaNacimientoBlur}
                    className={`login-input ${touched.fechaNacimiento ? (fechaNacimientoValid ? 'valid' : fechaNacimientoError ? 'error' : '') : ''}`}
                  />
                  <Calendar className="login-input-icon" style={{ color: fechaNacimientoValid ? '#5fb4b7' : '#999' }} />
                  {touched.fechaNacimiento && fechaNacimientoValid && <CheckCircle className="login-valid-icon" style={{ color: '#5fb4b7' }} />}
                  {touched.fechaNacimiento && fechaNacimientoError && <AlertCircle className="login-error-icon" style={{ color: '#ef4444' }} />}
                </div>
                {touched.fechaNacimiento && fechaNacimientoError && <p className="login-error-message"><span className="login-error-dot"></span>{fechaNacimientoError}</p>}
                {touched.fechaNacimiento && fechaNacimientoValid && <p className="login-success-message"><span className="login-success-dot"></span>Fecha válida ✓</p>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Género */}
              <div className="login-input-group">
                <label htmlFor="genero" className="login-label">
                  Género <span className="login-required">*</span>
                </label>
                <div className="login-input-wrapper">
                  <select
                    id="genero"
                    value={genero}
                    onChange={handleGeneroChange}
                    onBlur={handleGeneroBlur}
                    className={`login-input ${touched.genero ? (generoValid ? 'valid' : generoError ? 'error' : '') : ''}`}
                  >
                    <option value="prefiero_no_decir">Prefiero no decir</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                  <UserCheck className="login-input-icon" style={{ color: generoValid ? '#5fb4b7' : '#999' }} />
                  {touched.genero && generoValid && <CheckCircle className="login-valid-icon" style={{ color: '#5fb4b7' }} />}
                  {touched.genero && generoError && <AlertCircle className="login-error-icon" style={{ color: '#ef4444' }} />}
                </div>
                {touched.genero && generoError && <p className="login-error-message"><span className="login-error-dot"></span>{generoError}</p>}
                {touched.genero && generoValid && <p className="login-success-message"><span className="login-success-dot"></span>Género válido ✓</p>}
              </div>

              {/* Contraseña */}
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
                    className={`login-input ${touched.password ? (passwordValid ? 'valid' : passwordError ? 'error' : '') : ''}`}
                    placeholder="••••••••"
                  />
                  <Lock className="login-input-icon" style={{ color: passwordValid ? '#5fb4b7' : '#999' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="login-password-toggle">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {touched.password && passwordValid && <CheckCircle className="login-valid-icon-password" style={{ color: '#5fb4b7' }} />}
                  {touched.password && passwordError && <AlertCircle className="login-error-icon-password" style={{ color: '#ef4444' }} />}
                </div>
                {touched.password && passwordError && <p className="login-error-message"><span className="login-error-dot"></span>{passwordError}</p>}
                {touched.password && passwordValid && <p className="login-success-message"><span className="login-success-dot"></span>Contraseña segura ✓</p>}
              </div>

              {/* Confirmar Contraseña */}
              <div className="login-input-group">
                <label htmlFor="confirmPassword" className="login-label">
                  Confirmar Contraseña <span className="login-required">*</span>
                </label>
                <div className="login-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={handleConfirmPasswordBlur}
                    className={`login-input ${touched.confirmPassword ? (confirmPasswordValid ? 'valid' : confirmPasswordError ? 'error' : '') : ''}`}
                    placeholder="••••••••"
                  />
                  <Lock className="login-input-icon" style={{ color: confirmPasswordValid ? '#5fb4b7' : '#999' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="login-password-toggle">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {touched.confirmPassword && confirmPasswordValid && <CheckCircle className="login-valid-icon-password" style={{ color: '#5fb4b7' }} />}
                  {touched.confirmPassword && confirmPasswordError && <AlertCircle className="login-error-icon-password" style={{ color: '#ef4444' }} />}
                </div>
                {touched.confirmPassword && confirmPasswordError && <p className="login-error-message"><span className="login-error-dot"></span>{confirmPasswordError}</p>}
                {touched.confirmPassword && confirmPasswordValid && <p className="login-success-message"><span className="login-success-dot"></span>Contraseñas coinciden ✓</p>}
              </div>


              {/* Dirección */}
              <div className="login-input-group">
                <label htmlFor="direccion" className="login-label">
                  Dirección <span className="login-required">*</span>
                </label>
                <div className="login-input-wrapper">
                  <textarea
                    id="direccion"
                    value={direccion}
                    onChange={handleDireccionChange}
                    onBlur={handleDireccionBlur}
                    className={`login-input login-textarea ${touched.direccion ? (direccionValid ? 'valid' : direccionError ? 'error' : '') : ''}`}
                    placeholder="Ingresa tu dirección completa"
                  />
                  <Home className="login-input-icon" style={{ color: direccionValid ? '#5fb4b7' : '#999' }} />
                  {touched.direccion && direccionValid && <CheckCircle className="login-valid-icon" style={{ color: '#5fb4b7' }} />}
                  {touched.direccion && direccionError && <AlertCircle className="login-error-icon" style={{ color: '#ef4444' }} />}
                </div>
                {touched.direccion && direccionError && <p className="login-error-message"><span className="login-error-dot"></span>{direccionError}</p>}
                {touched.direccion && direccionValid && <p className="login-success-message"><span className="login-success-dot"></span>Dirección válida ✓</p>}
              </div>
            </>
          )}

          {/* Botón */}
          <button
            type={step === 1 ? 'button' : 'submit'}
            onClick={step === 1 ? handleNext : null}
            disabled={!isSubmitEnabled}
            className={`login-button ${isSubmitEnabled ? 'enabled' : 'disabled'}`}
          >
            {step === 1 
              ? (isSubmitEnabled ? 'Siguiente' : '⚠ Completa los campos del Paso 1') 
              : (isSubmitEnabled ? '✓ Crear Cuenta' : '⚠ Completa los campos del Paso 2')}
          </button>

          {/* Indicador de estado (adaptado por paso) */}
          <div className="login-status-indicator">
            {step === 1 && (
              <>
                <div className="login-status-item">
                  <div className={`login-status-dot ${nombreValid ? 'active' : ''}`}></div>
                  <span className={`login-status-text ${nombreValid ? 'active' : ''}`}>Nombre</span>
                </div>
                <div className="login-status-item">
                  <div className={`login-status-dot ${apellidoPaternoValid ? 'active' : ''}`}></div>
                  <span className={`login-status-text ${apellidoPaternoValid ? 'active' : ''}`}>Ap. Paterno</span>
                </div>
                <div className="login-status-item">
                  <div className={`login-status-dot ${apellidoMaternoValid ? 'active' : ''}`}></div>
                  <span className={`login-status-text ${apellidoMaternoValid ? 'active' : ''}`}>Ap. Materno</span>
                </div>
                <div className="login-status-item">
                  <div className={`login-status-dot ${emailValid ? 'active' : ''}`}></div>
                  <span className={`login-status-text ${emailValid ? 'active' : ''}`}>Email</span>
                </div>
                <div className="login-status-item">
                  <div className={`login-status-dot ${fechaNacimientoValid ? 'active' : ''}`}></div>
                  <span className={`login-status-text ${fechaNacimientoValid ? 'active' : ''}`}>Fecha Nac.</span>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="login-status-item">
                  <div className={`login-status-dot ${direccionValid ? 'active' : ''}`}></div>
                  <span className={`login-status-text ${direccionValid ? 'active' : ''}`}>Dirección</span>
                </div>
                <div className="login-status-item">
                  <div className={`login-status-dot ${generoValid ? 'active' : ''}`}></div>
                  <span className={`login-status-text ${generoValid ? 'active' : ''}`}>Género</span>
                </div>
                <div className="login-status-item">
                  <div className={`login-status-dot ${passwordValid ? 'active' : ''}`}></div>
                  <span className={`login-status-text ${passwordValid ? 'active' : ''}`}>Contraseña</span>
                </div>
                <div className="login-status-item">
                  <div className={`login-status-dot ${confirmPasswordValid ? 'active' : ''}`}></div>
                  <span className={`login-status-text ${confirmPasswordValid ? 'active' : ''}`}>Confirmar</span>
                </div>
              </>
            )}
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