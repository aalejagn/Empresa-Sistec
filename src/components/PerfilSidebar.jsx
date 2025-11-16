import React from 'react';
import { User, Shield, Building2, Settings, LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const PerfilSidebar = ({ activeSection, setActiveSection }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'info', label: 'Información General', icon: User },
    { id: 'historial', label: 'Historial de Compras', icon: ShoppingBag },
    { id: 'privacidad', label: 'Privacidad', icon: Shield },
    { id: 'empresa', label: 'Sobre SISTEC READ', icon: Building2 },
    { id: 'config', label: 'Configuración', icon: Settings },
  ];

  return (
    <aside className="perfil-sidebar">
      <div className="perfil-user-card">
        <div className="perfil-avatar">
          {user?.nombre?.[0]?.toUpperCase() || 'U'}
        </div>
        <h3>{user?.nombre || 'Usuario'}</h3>
        <p>{user?.email || 'email@dominio.com'}</p>
      </div>

      <nav className="perfil-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`perfil-menu-item ${
                activeSection === item.id ? 'active' : ''
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button onClick={logout} className="perfil-logout">
        <LogOut size={20} />
        <span>Cerrar Sesión</span>
      </button>
    </aside>
  );
};

export default PerfilSidebar;