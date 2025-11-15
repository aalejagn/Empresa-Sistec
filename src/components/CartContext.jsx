// src/components/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Inicializar el carrito desde localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('carrito');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error al cargar carrito del localStorage:", error);
      return [];
    }
  });

  // GUARDAR en localStorage cada vez que cambie el cart
  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar carrito en localStorage:", error);
    }
  }, [cart]);

  // Función para agregar al carrito
  const addToCart = (libro) => {
    setCart(prev => {
      const existe = prev.find(item => item.id === libro.id);
      if (existe) {
        // Si ya existe, aumentar cantidad
        return prev.map(item =>
          item.id === libro.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      // Si no existe, agregar nuevo
      return [...prev, { ...libro, cantidad: 1 }];
    });
  };

  // Función para actualizar cantidad
  const updateQuantity = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    setCart(prev => 
      prev.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  // Función para eliminar un item
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      setCart, 
      addToCart,
      updateQuantity,
      removeItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};