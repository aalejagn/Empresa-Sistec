import React, { useState } from 'react';

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  const handleLoginSubmit = (e) => { e.preventDefault(); console.log("Login:", loginData); alert(`Bienvenido, ${loginData.email}`); };
  const handleRegisterSubmit = (e) => { e.preventDefault(); console.log("Register:", registerData); alert(`Usuario ${registerData.name} registrado`); };

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        <button style={{ ...styles.tab, ...(activeTab === "login" ? styles.activeTab : {}) }} onClick={() => setActiveTab("login")}>Iniciar Sesión</button>
        <button style={{ ...styles.tab, ...(activeTab === "register" ? styles.activeTab : {}) }} onClick={() => setActiveTab("register")}>Registrarse</button>
      </div>
      {activeTab === "login" && (
        <form onSubmit={handleLoginSubmit} style={styles.form}>
          <h2 style={styles.title}>Bienvenido de nuevo</h2>
          <input type="email" name="email" placeholder="Correo electrónico" value={loginData.email} onChange={handleLoginChange} style={styles.input} required />
          <input type="password" name="password" placeholder="Contraseña" value={loginData.password} onChange={handleLoginChange} style={styles.input} required />
          <button type="submit" style={styles.button}>Ingresar</button>
          <p style={styles.extra}>¿Olvidaste tu contraseña?</p>
        </form>
      )}
      {activeTab === "register" && (
        <form onSubmit={handleRegisterSubmit} style={styles.form}>
          <h2 style={styles.title}>Crear cuenta nueva</h2>
          <input type="text" name="name" placeholder="Nombre completo" value={registerData.name} onChange={handleRegisterChange} style={styles.input} required />
          <input type="email" name="email" placeholder="Correo electrónico" value={registerData.email} onChange={handleRegisterChange} style={styles.input} required />
          <input type="password" name="password" placeholder="Contraseña" value={registerData.password} onChange={handleRegisterChange} style={styles.input} required />
          <button type="submit" style={styles.button}>Registrarse</button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: { width: "100%", maxWidth: "400px", margin: "80px auto", background: "#fff", borderRadius: "10px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)", padding: "30px 25px", textAlign: "center", fontFamily: "'Segoe UI', sans-serif" },
  tabs: { display: "flex", justifyContent: "space-around", marginBottom: "25px" },
  tab: { background: "none", border: "none", color: "#555", fontSize: "1rem", cursor: "pointer", padding: "10px", transition: "0.3s" },
  activeTab: { borderBottom: "2px solid #007bff", color: "#007bff", fontWeight: "bold" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  title: { marginBottom: "10px", color: "#333" },
  input: { padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "0.9rem" },
  button: { backgroundColor: "#007bff", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontSize: "1rem", transition: "background-color 0.3s" },
  extra: { marginTop: "10px", fontSize: "0.85rem", color: "#777", cursor: "pointer" },
};