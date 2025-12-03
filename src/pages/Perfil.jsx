// src/pages/Perfil.jsx
import React, { useState, useEffect } from 'react';
import PerfilSidebar from '../components/PerfilSidebar';
import { useAuth } from '../components/AuthContext';
import { 
  Mail, Phone, MapPin, Lock, Bell, Globe, Package, 
  Calendar, CreditCard, Truck, ShoppingBag, Clock, User, UserCheck
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Nuevo componente separado para la sección 'info'
const InfoSection = ({ user, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newNombre, setNewNombre] = useState(user?.nombre || '');
  const [newApellidoPaterno, setNewApellidoPaterno] = useState(user?.apellido_paterno || '');
  const [newApellidoMaterno, setNewApellidoMaterno] = useState(user?.apellido_materno || '');
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newTelefono, setNewTelefono] = useState(user?.telefono || '');
  const [newDireccion, setNewDireccion] = useState(user?.direccion || '');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Función para formatear género
  const formatearGenero = (genero) => {
    if (!genero) return 'No especificado';
    const map = {
      masculino: 'Masculino',
      femenino: 'Femenino',
      otro: 'Otro',
      prefiero_no_decir: 'Prefiero no decir'
    };
    return map[genero] || genero;
  };

  // Manejar actualización
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validaciones rápidas
    if (newNombre && newNombre.length < 2) {
      setError('Nombre debe tener al menos 2 caracteres');
      return;
    }
    if (newApellidoPaterno && newApellidoPaterno.length < 2) {
      setError('Apellido paterno debe tener al menos 2 caracteres');
      return;
    }
    if (newEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setError('Correo inválido');
      return;
    }
    if (newTelefono && newTelefono.length < 10) {
      setError('Teléfono debe tener al menos 10 dígitos');
      return;
    }
    if (newDireccion && newDireccion.length < 5) {
      setError('Dirección debe tener al menos 5 caracteres');
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/update_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_user',
          user_id: user.id,
          nombre: newNombre || undefined,
          apellido_paterno: newApellidoPaterno || undefined,
          apellido_materno: newApellidoMaterno || undefined,
          email: newEmail || undefined,
          telefono: newTelefono || undefined,
          direccion: newDireccion || undefined,
          password: newPassword || undefined
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Datos actualizados correctamente');
        updateUser(data.user);  // Actualiza el user global
        setNewPassword(''); // Limpiar contraseña
        setIsEditing(false);  // Cierra el formulario
      } else {
        setError(data.error || 'Error al actualizar');
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo más tarde.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="perfil-section">
      <h2>Información General</h2>

      <div className="perfil-info-grid">
        <div className="info-item">
          <User className="info-icon" />
          <div>
            <strong>Nombre</strong>
            <p>{user?.nombre || 'No registrado'}</p>
          </div>
        </div>
        <div className="info-item">
          <User className="info-icon" />
          <div>
            <strong>Apellido Paterno</strong>
            <p>{user?.apellido_paterno || 'No registrado'}</p>
          </div>
        </div>
        <div className="info-item">
          <User className="info-icon" />
          <div>
            <strong>Apellido Materno</strong>
            <p>{user?.apellido_materno || 'No registrado'}</p>
          </div>
        </div>
        <div className="info-item">
          <Mail className="info-icon" />
          <div>
            <strong>Correo</strong>
            <p>{user?.email || 'No registrado'}</p>
          </div>
        </div>
        <div className="info-item">
          <Phone className="info-icon" />
          <div>
            <strong>Teléfono</strong>
            <p>{user?.telefono || 'No registrado'}</p>
          </div>
        </div>
        <div className="info-item">
          <Calendar className="info-icon" />
          <div>
            <strong>Fecha de Nacimiento</strong>
            <p>
              {user?.fecha_nacimiento
                ? new Date(user.fecha_nacimiento).toLocaleDateString('es-MX')
                : 'No registrado'}
            </p>
          </div>
        </div>
        <div className="info-item">
          <MapPin className="info-icon" />
          <div>
            <strong>Dirección</strong>
            <p>{user?.direccion || 'No registrado'}</p>
          </div>
        </div>
        <div className="info-item">
          <UserCheck className="info-icon" />
          <div>
            <strong>Género</strong>
            <p>{formatearGenero(user?.genero)}</p>
          </div>
        </div>
      </div>

      {/* Botón para mostrar/ocultar formulario */}
      <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancelar Edición' : 'Editar Información'}
      </button>

      {/* === FORMULARIO DE EDICIÓN (solo si isEditing es true) === */}
      {isEditing && (
        <div className="edit-profile-section">
          <h3 className="edit-title">Editar Información</h3>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <form className="edit-form" onSubmit={handleUpdate}>
            <div className="input-group">
              <label>Nombre</label>
              <input
                type="text"
                value={newNombre}
                onChange={(e) => setNewNombre(e.target.value)}
                placeholder={user?.nombre || 'Nuevo nombre'}
              />
            </div>

            <div className="input-group">
              <label>Apellido Paterno</label>
              <input
                type="text"
                value={newApellidoPaterno}
                onChange={(e) => setNewApellidoPaterno(e.target.value)}
                placeholder={user?.apellido_paterno || 'Nuevo apellido paterno'}
              />
            </div>

            <div className="input-group">
              <label>Apellido Materno</label>
              <input
                type="text"
                value={newApellidoMaterno}
                onChange={(e) => setNewApellidoMaterno(e.target.value)}
                placeholder={user?.apellido_materno || 'Nuevo apellido materno'}
              />
            </div>

            <div className="input-group">
              <label>Nuevo correo electrónico</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder={user?.email || 'Nuevo correo'}
              />
            </div>

            <div className="input-group">
              <label>Nuevo teléfono</label>
              <input
                type="tel"
                value={newTelefono}
                onChange={(e) => setNewTelefono(e.target.value)}
                placeholder={user?.telefono || 'Ej: 9611234567'}
              />
            </div>

            <div className="input-group">
              <label>Nueva dirección</label>
              <input
                type="text"
                value={newDireccion}
                onChange={(e) => setNewDireccion(e.target.value)}
                placeholder={user?.direccion || 'Nueva dirección'}
              />
            </div>

            <div className="input-group">
              <label>Nueva contraseña (dejar vacío si no quieres cambiarla)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`btn-update ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? 'Actualizando...' : 'Guardar Cambios'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Nuevo componente para la sección 'privacidad'
const PrivacidadSection = ({ user }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validaciones
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/change_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          old_password: oldPassword,
          new_password: newPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('¡Contraseña cambiada exitosamente! 🎉');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error || 'Error al cambiar la contraseña');
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo más tarde.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="perfil-section">
      <h2>Privacidad y Seguridad</h2>

      <div className="privacy-options">
        <div className="config-item">
          <Lock className="info-icon" style={{ width: 24, height: 24, color: '#5DBFB3' }} />
          <div>
            <strong>Cambiar Contraseña</strong>
            <p>Actualiza tu contraseña para mantener tu cuenta segura</p>
          </div>
        </div>
      </div>

      <div className="edit-profile-section" style={{ marginTop: '2rem', border: '2px dashed #5DBFB3' }}>
        <h3 className="edit-title">Cambiar Contraseña</h3>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form className="edit-form" onSubmit={handleChangePassword}>
          <div className="input-group">
            <label>Contraseña Actual</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="input-group">
            <label>Nueva Contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="input-group">
            <label>Confirmar Nueva Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite la nueva contraseña"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`btn-update ${isLoading ? 'loading' : ''}`}
            style={{ minWidth: '220px' }}
          >
            {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px' }}>
        <h4>Consejos de seguridad</h4>
        <ul style={{ margin: '1rem 0', color: '#555', lineHeight: '1.6' }}>
          <li>Usa una contraseña única (no la repitas en otros sitios)</li>
          <li>Combina letras mayúsculas, minúsculas, números y símbolos</li>
          <li>Cambia tu contraseña cada 3-6 meses</li>
          <li>Nunca compartas tu contraseña</li>
        </ul>
      </div>
    </div>
  );
};

const Perfil = () => {
  const { user, updateUser } = useAuth();
  const [activeSection, setActiveSection] = useState('info');
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeSection === 'historial' && user?.id) {
      cargarHistorial();
    }
  }, [activeSection, user]);

  const cargarHistorial = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/historial.php?usuario_id=${user.id}`);
      const data = await res.json();
      if (data.success) {
        setCompras(data.ventas);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error al cargar historial:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatMetodoPago = (metodo) => {
    const metodos = {
      'debito': 'Tarjeta de Débito',
      'credito': 'Tarjeta de Crédito',
      'paypal': 'PayPal',
      'oxxo': 'Oxxo Pay'
    };
    return metodos[metodo] || metodo;
  };

  const calcularSubtotal = (items) => {
    return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'info':
        return <InfoSection user={user} updateUser={updateUser} />;

      case 'historial':
        return (
          <div className="perfil-section">
            <div className="historial-header">
              <h2>Historial de Compras</h2>
              {compras.length > 0 && (
                <div className="historial-stats">
                  <span className="stat-item">
                    <strong>{compras.length}</strong> {compras.length === 1 ? 'compra' : 'compras'}
                  </span>
                </div>
              )}
            </div>

            {loading ? (
              <div className="loading-state">
                Cargando tus compras...
              </div>
            ) : compras.length === 0 ? (
              <div className="empty-historial">
                <ShoppingBag size={64} className="empty-icon" />
                <h3>Aún no tienes compras</h3>
                <p>¡Explora nuestro catálogo y encuentra tu próximo libro favorito!</p>
                <a href="/categorias" className="btn-start-shopping">
                  Ir a Comprar
                </a>
              </div>
            ) : (
              <div className="historial-list">
                {compras.map((venta) => {
                  const items = JSON.parse(venta.items);
                  const subtotal = calcularSubtotal(items);
                  const iva = subtotal * 0.16;
                  const total = subtotal + iva;

                  return (
                    <div key={venta.id} className="compra-card">
                      <div className="compra-header">
                        <div className="compra-info-principal">
                          <h3>Orden #{venta.id}</h3>
                          <div className="compra-meta">
                            <div className="compra-fecha">
                              <Calendar size={16} />
                              {new Date(venta.creado_en).toLocaleDateString('es-MX')}
                            </div>
                            <div className={`compra-estatus estatus-${venta.estado}`}>
                              {venta.estado === 'pendiente' ? 'Procesando' : 
                               venta.estado === 'pagado' ? 'Enviado' : 'Entregado'}
                            </div>
                          </div>
                        </div>
                        <div className="compra-total">
                          <span className="total-label">Total</span>
                          <span className="total-amount">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="compra-details">
                        <div className="detail-row">
                          <div className="detail-item">
                            <Truck size={20} />
                            <div>
                              <strong>Entrega</strong>
                              <p>{venta.tipo_entrega === 'domicilio' ? 'A domicilio' : 'Retiro en tienda'}</p>
                            </div>
                          </div>
                          <div className="detail-item">
                            <CreditCard size={20} />
                            <div>
                              <strong>Pago</strong>
                              <p>{formatMetodoPago(venta.metodo_pago)}</p>
                            </div>
                          </div>
                          <div className="detail-item full-width">
                            <MapPin size={20} />
                            <div>
                              <strong>Dirección</strong>
                              <p>{venta.direccion || 'Retiro en tienda'}</p>
                              {venta.ciudad && <p className="text-muted">{venta.ciudad}, {venta.estado}</p>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="compra-items">
                        <h4>
                          <Package size={18} /> Productos
                        </h4>
                        <div className="items-list">
                          {items.map((item, idx) => (
                            <div key={idx} className="item-compra">
                              <div className="item-info">
                                <div className="item-titulo">
                                  <i className="fas fa-book"></i>
                                  {item.titulo}
                                </div>
                                <div className="item-cantidad">x{item.cantidad}</div>
                              </div>
                              <div className="item-precios">
                                <span className="precio-unitario">${item.precio} c/u</span>
                                <span className="item-precio">
                                  ${(item.precio * item.cantidad).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="items-totales">
                          <div className="items-subtotal">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="items-iva">
                            <span>IVA (16%):</span>
                            <span>${iva.toFixed(2)}</span>
                          </div>
                          <div className="items-total-final">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="compra-actions">
                        <button className="btn-recomprar">
                          <ShoppingBag size={16} /> Recomprar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'privacidad':
        return <PrivacidadSection user={user} />;

      case 'empresa':
        return (
          <div className="perfil-section">
            <h2>Sobre SISTEC READ</h2>
            <div className="empresa-info">
              <div className="empresa-header">
                <img src="/assets/Images/logo.png" alt="SISTEC READ" className="empresa-logo" />
                <div className="empresa-slogan">
                  <h3>Tu puerta al mundo de la lectura</h3>
                  <p className="subtitle">Conectando lectores con sus historias favoritas desde 2024</p>
                </div>
              </div>

              <div className="empresa-mision">
                <h4>Nuestra Misión</h4>
                <p>
                  En <strong>SISTEC READ</strong>, creemos que cada libro es una nueva aventura. 
                  Nos dedicamos a hacer que la lectura sea accesible para todos, ofreciendo 
                  miles de títulos con entrega rápida y segura en todo México.
                </p>
              </div>

              <div className="empresa-valores">
                <h4>Nuestros Valores</h4>
                <div className="valores-grid">
                  <div className="valor-card">
                    <div className="valor-icon">📚</div>
                    <h5>Pasión por la Lectura</h5>
                    <p>Creemos en el poder transformador de los libros</p>
                  </div>
                  <div className="valor-card">
                    <div className="valor-icon">⚡</div>
                    <h5>Calidad</h5>
                    <p>Solo los mejores títulos llegan a tu hogar</p>
                  </div>
                  <div className="valor-card">
                    <div className="valor-icon">🌟</div>
                    <h5>Accesibilidad</h5>
                    <p>Lectura para todos, sin barreras</p>
                  </div>
                  <div className="valor-card">
                    <div className="valor-icon">🚀</div>
                    <h5>Innovación</h5>
                    <p>Tecnología al servicio de los lectores</p>
                  </div>
                </div>
              </div>

              <div className="empresa-contacto">
                <h4>¿Tienes Preguntas?</h4>
                <p>Nuestro equipo está aquí para ayudarte</p>
                <div className="contacto-buttons">
                  <a href="/ubicacion" className="btn-contacto-secondary">
                    <MapPin size={18} /> Visítanos
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case 'estadisticas':
        return <EstadisticasUsuario usuarioId={user?.id} />;

      case 'config':
        return (
          <div className="perfil-section">
            <h2>Configuración</h2>
            <div className="config-options">
              <div className="config-item">
                <Bell />
                <div>
                  <strong>Notificaciones</strong>
                  <p>Personaliza tus alertas</p>
                </div>
              </div>
              <div className="config-item">
                <Globe />
                <div>
                  <strong>Idioma</strong>
                  <p>Español (México)</p>
                </div>
              </div>
              <div className="config-item">
                <Lock />
                <div>
                  <strong>Seguridad</strong>
                  <p>2FA, historial de sesiones</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <main className="perfil-main">
        <div className="container perfil-container">
          <PerfilSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          <section className="perfil-content">
            {renderContent()}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Perfil;