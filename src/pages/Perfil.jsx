// src/pages/Perfil.jsx
import React, { useState, useEffect } from 'react';
import PerfilSidebar from '../components/PerfilSidebar';
import { useAuth } from '../components/AuthContext';
import { 
  Mail, Phone, MapPin, Lock, Bell, Globe, Package, 
  Calendar, CreditCard, Truck, ShoppingBag, Clock 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Perfil = () => {
  const { user } = useAuth();
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
        return (
          <div className="perfil-section">
            <h2>Información General</h2>
            <div className="perfil-info-grid">
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
                  <strong>Nombre</strong>
                  <p>{user?.nombre || 'Sin nombre'}</p>
                </div>
              </div>
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <strong>Usuario desde</strong>
                  <p>{new Date().toLocaleDateString('es-MX')}</p>
                </div>
              </div>
            </div>
            <button className="btn-edit">Editar Información</button>
          </div>
        );

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
        return (
          <div className="perfil-section">
            <h2>Privacidad</h2>
            <div className="privacy-options">
              <label>
                <input type="checkbox" defaultChecked />
                <span>Recibir notificaciones por correo</span>
              </label>
              <label>
                <input type="checkbox" defaultChecked />
                <span>Permitir que otros vean mi perfil</span>
              </label>
            </div>
            <button className="btn-danger">Cambiar Contraseña</button>
          </div>
        );

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

      // ========================================
      // NUEVA SECCIÓN: ESTADÍSTICAS
      // ========================================
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