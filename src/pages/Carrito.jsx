// src/pages/Carrito.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";  // ← NUEVO (solo esta línea)

const Carrito = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();  // ← NUEVO (solo esta línea)
  const navigate = useNavigate();

  // Cálculos
  const IVA_RATE = 0.16;
  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + parseFloat(item.precio) * item.cantidad,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const iva = subtotal * IVA_RATE;
  const total = subtotal + iva;

  // ← AQUÍ ESTÁ LO NUEVO (solo este manejador cambió)
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (!user) {
      alert("Debes iniciar sesión para continuar con la compra");
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };
  // ← FIN DE LO NUEVO

  return (
    <>
      <Header />
      <main className="carrito-main">
        <div className="container">
          <h1 className="page-title">Tu Carrito de Compras</h1>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-shopping-cart"></i>
              <h2>Tu carrito está vacío</h2>
              <p>¡Explora nuestro catálogo y encuentra tus libros favoritos!</p>
              <Link to="/categorias" className="btn btn-primary">
                Explorar Libros
              </Link>
            </div>
          ) : (
            <div className="cart-content">
              {/* SECCIÓN DE ARTÍCULOS */}
              <div className="cart-items-section">
                <div className="cart-header">
                  <h2>Artículos ({cart.length})</h2>
                  <button className="btn-clear-cart" onClick={clearCart}>
                    Vaciar Carrito
                  </button>
                </div>

                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <img src={item.imagen} alt={item.titulo} />
                      </div>

                      <div className="item-details">
                        <h3 className="item-title">{item.titulo}</h3>
                        <p className="item-author">
                          {item.autor}
                        </p>
                        {item.editorial && (
                          <p className="item-editorial">
                            {item.editorial}
                          </p>
                        )}
                        {item.publicado && (
                          <p className="item-year">
                            {item.publicado}
                          </p>
                        )}
                        <p className="item-price">
                          ${parseFloat(item.precio).toFixed(2)} USD
                        </p>
                      </div>

                      <div className="item-actions">
                        <div className="quantity-controls">
                          <button
                            className="qty-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.cantidad - 1)
                            }
                            disabled={item.cantidad <= 1}
                          >
                            -
                          </button>
                          <span className="quantity">{item.cantidad}</span>
                          <button
                            className="qty-btn"
                            onClick={() =>
                              updateQuantity(item.id, item.cantidad + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <div className="item-subtotal">
                          <span className="subtotal-label">Subtotal:</span>
                          <span className="subtotal-amount">
                            ${(parseFloat(item.precio) * item.cantidad).toFixed(2)}
                          </span>
                        </div>

                        <button
                          className="btn-remove"
                          onClick={() => removeItem(item.id)}
                          title="Eliminar del carrito"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RESUMEN DE COMPRA */}
              <div className="cart-summary">
                <h2 className="summary-title">Resumen de Compra</h2>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>
                      Subtotal (
                      {cart.reduce((acc, item) => acc + item.cantidad, 0)} artículos):
                    </span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>IVA (16%):</span>
                    <span>${iva.toFixed(2)}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row summary-total">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* ← AQUÍ CAMBIÉ EL onClick */}
                <button
                  className="btn btn-checkout"
                  onClick={handleCheckout}   // ← ahora usa la función protegida
                >
                  Proceder al Pago
                </button>

                <Link to="/categorias" className="btn btn-continue">
                  Seguir Comprando
                </Link>
                <div className="security-badges">
                  Compra 100% segura
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Carrito;