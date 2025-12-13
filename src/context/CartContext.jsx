import React, { createContext, useState, useContext } from 'react'; // <--- AGREGADO "React"

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Añadir producto
  const addToCart = (product) => {
    setCart((prevCart) => {
      // ¿El producto ya está en el carrito?
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Si existe, aumentamos cantidad
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        // Si no, lo agregamos con qty: 1
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  // Eliminar un producto completo
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Disminuir cantidad
  const decreaseQty = (id) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          return { ...item, qty: Math.max(item.qty - 1, 1) }; // Mínimo 1
        }
        return item;
      });
    });
  };

  // Aumentar cantidad
  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)
    );
  };

  // Vaciar carrito (usar al comprar)
  const clearCart = () => setCart([]);

  // Cálculos derivados
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      decreaseQty,
      increaseQty,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
