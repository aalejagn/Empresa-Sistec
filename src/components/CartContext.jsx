// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('carrito');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Guardar cada cambio
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (libro) => {
    setCart(prev => {
      const existe = prev.find(item => item.titulo === libro.titulo);
      if (existe) {
        return prev.map(item =>
          item.titulo === libro.titulo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...libro, cantidad: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};