import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:8000/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/categorias');  // Redirige a categorías o home
        return true;
      } else {
        alert(data.error);
        return false;
      }
    } catch (error) {
      alert('Error de conexión');
      return false;
    }
  };

  const register = async (nombre, email, password) => {
    try {
      const res = await fetch('http://localhost:8000/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', nombre, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        // Auto-login después de registro
        return await login(email, password);
      } else {
        alert(data.error);
        return false;
      }
    } catch (error) {
      alert('Error de conexión');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};