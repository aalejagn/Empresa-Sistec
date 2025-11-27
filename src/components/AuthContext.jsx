// src/components/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔧 IMPORTANTE: Usando PHP Built-in Server en puerto 8000
  const API_URL = '/home/www/public_html/backend/api/auth.php';

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    // Primero intenta de localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // SIN credentials: 'include' → esto arregla el CORS
        body: JSON.stringify({ action: 'check_session' })
      });

      const data = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));  // Guarda para recargas
      }
    } catch (error) {
      console.error('Error al verificar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  // REGISTRO
  const register = async (nombre, email, password) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // SIN credentials
        body: JSON.stringify({ action: 'register', nombre, email, password })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));  // Guarda
        alert('✅ ' + data.message);
        navigate('/categorias');
        return { success: true };
      } else {
        alert('❌ ' + data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      alert('❌ Error: ' + error.message + '\nVerifica PHP en: ' + API_URL);
      return { success: false, error: 'Error de conexión' };
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // SIN credentials
        body: JSON.stringify({ action: 'login', email, password })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));  // Guarda
        alert('✅ ' + data.message);
        navigate('/categorias');
        return { success: true };
      } else {
        alert('❌ ' + data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert('❌ Error: ' + error.message + '\nVerifica PHP en: ' + API_URL);
      return { success: false, error: 'Error de conexión' };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // SIN credentials
        body: JSON.stringify({ action: 'logout' })
      });

      setUser(null);
      localStorage.removeItem('user');  // Limpia
      navigate('/login');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkSession,
    API_URL
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#5DBFB3',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #5DBFB3',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Cargando SISTEC READ...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};