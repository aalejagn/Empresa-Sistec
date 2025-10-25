// src/pages/Login.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/css/style.css';
import '../assets/css/header.css';
import '../assets/css/footer.css';
function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    validateLogin();
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    validateRegister();
  };

  const validateLogin = () => {
    const valid = loginData.email.includes('@') && loginData.password.length >= 6;
    setIsValid(valid);
    setError(valid ? '' : 'Correo inválido o contraseña demasiado corta');
  };

  const validateRegister = () => {
    const valid = registerData.name.trim() && registerData.email.includes('@') && registerData.password.length >= 6;
    setIsValid(valid);
    setError(valid ? '' : 'Completa todos los campos correctamente');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log("Login:", loginData);
      alert(`Bienvenido, ${loginData.email}`);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log("Register:", registerData);
      alert(`Usuario ${registerData.name} registrado`);
    }
  };

  return (
    <div>
      <Header />
      <main className="container" style={{ backgroundColor: '#f3f3f3', margin: '0', padding: '0' }}>
        <div style={{ maxWidth: '400px', margin: '80px auto', background: '#fff', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', padding: '30px 25px', textAlign: 'center', fontFamily: "'Segoe UI', sans-serif" }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '25px' }}>
            <button style={{ background: 'none', border: 'none', color: activeTab === "login" ? '#007bff' : '#555', fontSize: '1rem', cursor: 'pointer', padding: '10px', transition: '0.3s', borderBottom: activeTab === "login" ? '2px solid #007bff' : 'none' }} onClick={() => setActiveTab("login")}>Iniciar Sesión</button>
            <button style={{ background: 'none', border: 'none', color: activeTab === "register" ? '#007bff' : '#555', fontSize: '1rem', cursor: 'pointer', padding: '10px', transition: '0.3s', borderBottom: activeTab === "register" ? '2px solid #007bff' : 'none' }} onClick={() => setActiveTab("register")}>Registrarse</button>
          </div>
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h2 style={{ marginBottom: '10px', color: '#333' }}>Bienvenido de nuevo</h2>
              <input type="email" name="email" placeholder="Correo electrónico" value={loginData.email} onChange={handleLoginChange} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.9rem' }} required />
              <input type="password" name="password" placeholder="Contraseña" value={loginData.password} onChange={handleLoginChange} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.9rem' }} required />
              {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}
              <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', transition: 'background-color 0.3s' }} disabled={!isValid}>Ingresar</button>
            </form>
          )}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h2 style={{ marginBottom: '10px', color: '#333' }}>Crear cuenta nueva</h2>
              <input type="text" name="name" placeholder="Nombre completo" value={registerData.name} onChange={handleRegisterChange} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.9rem' }} required />
              <input type="email" name="email" placeholder="Correo electrónico" value={registerData.email} onChange={handleRegisterChange} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.9rem' }} required />
              <input type="password" name="password" placeholder="Contraseña" value={registerData.password} onChange={handleRegisterChange} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.9rem' }} required />
              {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}
              <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', transition: 'background-color 0.3s' }} disabled={!isValid}>Registrarse</button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;