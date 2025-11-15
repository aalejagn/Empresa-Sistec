// src/pages/Carrito.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from "../components/CartContext";

const Carrito = () => {
  const { cart, setCart } = useCart();

  const updateQuantity = (titulo, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCart(cart.map(item =>
      item.titulo === titulo ? { ...item, cantidad: nuevaCantidad } : item
    ));
  };

  const removeItem = (titulo) => {
    setCart(cart.filter(item => item.titulo !== titulo));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.precio) * item.cantidad), 0).toFixed(2);
  };

  const handleCheckout = () => {
    alert("¡Compra simulada! (Más adelante se conectará con ventas.php)");
  };

  return (
    <>
      <Header />
      <main className="carrito-main">
        <div className="container">
          <h1 className="page-title">Tu Carrito de Compras</h1>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío.</p>
              <Link to="/categorias" className="btn btn-primary">Explorar Libros</Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.titulo} className="cart-item">
                    <div className="item-info">
                      <h3>{item.titulo}</h3>
                      <p>Autor: {item.autor}</p>
                      <p>Precio: ${parseFloat(item.precio).toFixed(2)}</p>
                    </div>
                    <div className="item-quantity">
                      <button onClick={() => updateQuantity(item.titulo, item.cantidad - 1)} disabled={item.cantidad <= 1}>
                        -
                      </button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.titulo, item.cantidad + 1)}>+</button>
                    </div>
                    <div className="item-subtotal">
                      Subtotal: ${(parseFloat(item.precio) * item.cantidad).toFixed(2)}
                    </div>
                    <button className="btn-remove" onClick={() => removeItem(item.titulo)}>Eliminar</button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h2>Total: ${calculateTotal()}</h2>
                <button className="btn btn-primary" onClick={handleCheckout}>Proceder al Pago</button>
                <button className="btn btn-secondary" onClick={clearCart}>Vaciar Carrito</button>
                <Link to="/categorias" className="btn btn-tertiary">Seguir Comprando</Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Carrito;