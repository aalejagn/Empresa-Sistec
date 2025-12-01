import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, ShoppingCart, BookOpen, DollarSign, Calendar, TrendingUp, Award, Star, Zap, Package } from 'lucide-react';

const EstadisticasUsuario = ({ usuarioId }) => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const response = await fetch(`http://localhost/sistecread/estadisticas_usuario.php?usuario_id=${usuarioId}`);
        const data = await response.json();
        
        if (data.success) {
          setDatos(data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Error al cargar estadísticas');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    if (usuarioId) {
      cargarEstadisticas();
    }
  }, [usuarioId]);

  // Calcular logros
  const calcularLogros = () => {
    if (!datos) return [];

    const logros = [];
    const stats = datos.estadisticas;

    if (stats.total_compras >= 1) {
      logros.push({
        titulo: 'Primera Compra',
        descripcion: 'Realizaste tu primera compra',
        desbloqueado: true,
        icono: '🎉',
        color: 'logro-verde'
      });
    }

    if (stats.total_libros >= 5) {
      logros.push({
        titulo: 'Lector Frecuente',
        descripcion: `Has comprado ${stats.total_libros} libros`,
        desbloqueado: true,
        icono: '📚',
        color: 'logro-azul'
      });
    }

    if (stats.total_libros >= 10) {
      logros.push({
        titulo: 'Coleccionista',
        descripcion: 'Más de 10 libros en tu colección',
        desbloqueado: true,
        icono: '🏆',
        color: 'logro-amarillo'
      });
    }

    if (stats.total_gastado >= 500) {
      logros.push({
        titulo: 'Cliente VIP',
        descripcion: `Has invertido $${stats.total_gastado.toFixed(2)} en libros`,
        desbloqueado: true,
        icono: '⭐',
        color: 'logro-morado'
      });
    }

    if (datos.usuario.dias_como_miembro >= 30) {
      logros.push({
        titulo: 'Miembro Veterano',
        descripcion: `${datos.usuario.dias_como_miembro} días con nosotros`,
        desbloqueado: true,
        icono: '🎖️',
        color: 'logro-naranja'
      });
    }

    if (stats.total_compras < 10) {
      logros.push({
        titulo: 'Comprador Experto',
        descripcion: `Realiza 10 compras (${stats.total_compras}/10)`,
        desbloqueado: false,
        icono: '🔒',
        color: 'logro-bloqueado'
      });
    }

    return logros;
  };

  const COLORES = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatearMes = (mesString) => {
    const [año, mes] = mesString.split('-');
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[parseInt(mes) - 1];
  };

  if (cargando) {
    return (
      <div className="perfil-section">
        <div className="loading-state">
          Cargando estadísticas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="perfil-section">
        <div className="empty-historial">
          <h3>Error al cargar estadísticas</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const logros = calcularLogros();
  const stats = datos.estadisticas;

  return (
    <div className="perfil-section">
      {/* Header con saludo */}
      <div className="estadisticas-header">
        <div>
          <h2>Tus Estadísticas 📊</h2>
          <p className="text-muted">
            Miembro desde hace {datos.usuario.dias_como_miembro} días
          </p>
        </div>
        <Trophy size={40} style={{ color: '#F59E0B' }} />
      </div>

      {/* Tarjetas de métricas principales */}
      <div className="perfil-info-grid estadisticas-metricas">
        <div className="info-item metrica-card metrica-azul">
          <ShoppingCart className="info-icon" size={32} />
          <div>
            <strong className="metrica-numero">{stats.total_compras}</strong>
            <p>Compras Totales</p>
          </div>
        </div>

        <div className="info-item metrica-card metrica-verde">
          <BookOpen className="info-icon" size={32} />
          <div>
            <strong className="metrica-numero">{stats.total_libros}</strong>
            <p>Libros Comprados</p>
          </div>
        </div>

        <div className="info-item metrica-card metrica-morado">
          <DollarSign className="info-icon" size={32} />
          <div>
            <strong className="metrica-numero">${stats.total_gastado.toFixed(0)}</strong>
            <p>Total Invertido</p>
          </div>
        </div>

        <div className="info-item metrica-card metrica-naranja">
          <TrendingUp className="info-icon" size={32} />
          <div>
            <strong className="metrica-numero">${stats.promedio_por_compra.toFixed(0)}</strong>
            <p>Promedio por Compra</p>
          </div>
        </div>
      </div>

      {/* Gráficas */}
      <div className="estadisticas-graficas">
        {/* Compras por mes */}
        <div className="grafica-container">
          <h3 className="grafica-titulo">
            <TrendingUp size={20} /> Compras por Mes
          </h3>
          <div className="grafica-content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datos.compras_por_mes.map(item => ({
                ...item,
                mes: formatearMes(item.mes)
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cantidad" 
                  stroke="#4F46E5" 
                  strokeWidth={3} 
                  name="Compras"
                  dot={{ fill: '#4F46E5', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categorías favoritas */}
        <div className="grafica-container">
          <h3 className="grafica-titulo">
            <Package size={20} /> Categorías Favoritas
          </h3>
          <div className="grafica-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datos.categorias_favoritas}
                  dataKey="cantidad"
                  nameKey="categoria"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={(entry) => entry.categoria}
                >
                  {datos.categorias_favoritas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Logros */}
      <div className="logros-section">
        <h3 className="seccion-titulo">
          <Trophy size={24} style={{ color: '#F59E0B' }} /> Tus Logros
        </h3>
        <div className="logros-grid">
          {logros.map((logro, index) => (
            <div key={index} className={`logro-card ${logro.color}`}>
              <div className="logro-header">
                <span className="logro-icono">{logro.icono}</span>
                <h4 className="logro-titulo">{logro.titulo}</h4>
              </div>
              <p className="logro-descripcion">{logro.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Libros favoritos */}
      {datos.libros_favoritos.length > 0 && (
        <div className="libros-favoritos-section">
          <h3 className="seccion-titulo">
            <Star size={24} style={{ color: '#EF4444' }} /> Tus Libros Favoritos
          </h3>
          <div className="libros-favoritos-grid">
            {datos.libros_favoritos.map((libro, index) => (
              <div key={index} className="libro-favorito-card">
                <img
                  src={libro.imagen}
                  alt={libro.titulo}
                  className="libro-favorito-img"
                />
                <div className="libro-favorito-info">
                  <h4 className="libro-favorito-titulo">{libro.titulo}</h4>
                  <p className="libro-favorito-autor">{libro.autor}</p>
                  <p className="libro-favorito-veces">
                    Comprado {libro.veces_comprado} {libro.veces_comprado > 1 ? 'veces' : 'vez'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Datos adicionales */}
      {datos.libro_mas_caro && (
        <div className="datos-adicionales">
          <div className="dato-item">
            <Award size={20} />
            <div>
              <strong>Libro más caro comprado:</strong>
              <p>{datos.libro_mas_caro.titulo} - ${datos.libro_mas_caro.precio}</p>
            </div>
          </div>
          {datos.primera_compra && (
            <div className="dato-item">
              <Calendar size={20} />
              <div>
                <strong>Primera compra:</strong>
                <p>{new Date(datos.primera_compra.creado_en).toLocaleDateString('es-MX')}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EstadisticasUsuario;