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
  const API_URL = 'http://localhost:8000/auth.php';

  // Verificar sesión al cargar la app
  useEffect(() => {
    checkSession();
  }, []);

  // Verificar si hay sesión activa
  const checkSession = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'check_session' })
      });

      const data = await response.json();
      
      if (data.success && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error al verificar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============== REGISTRO ==============
  const register = async (nombre, email, password) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'register',
          nombre,
          email,
          password
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        alert('✅ ' + data.message);
        navigate('/categorias'); // O la ruta que prefieras después del registro
        return { success: true };
      } else {
        alert('❌ ' + data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      alert('❌ Error de conexión: ' + error.message + '\n\nVerifica que el servidor PHP esté corriendo en: ' + API_URL);
      return { success: false, error: 'Error de conexión' };
    }
  };

  // ============== LOGIN ==============
  const login = async (email, password) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'login',
          email,
          password
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        alert('✅ ' + data.message);
        navigate('/categorias'); // O la ruta que prefieras después del login
        return { success: true };
      } else {
        alert('❌ ' + data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert('❌ Error de conexión: ' + error.message + '\n\nVerifica que el servidor PHP esté corriendo en: ' + API_URL);
      return { success: false, error: 'Error de conexión' };
    }
  };

  // ============== LOGOUT ==============
  const logout = async () => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'logout' })
      });

      setUser(null);
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
    API_URL  // Exportamos la URL para usarla en otros componentes
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};