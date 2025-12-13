import React, { createContext, useContext, useState, useEffect } from 'react';
// Asegúrate de que la ruta a api sea la correcta
import { getProducts } from '../services/api';

const ProductContext = createContext();

// 👇 ESTA ERA LA PARTE QUE FALLABA: Faltaba el 'export' al inicio
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe usarse dentro de un ProductProvider");
  }
  return context;
};

// 👇 El Provider también debe tener 'export'
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("📡 Pidiendo productos al backend...");
        const data = await getProducts();
        console.log("📦 Productos recibidos:", data);
        setProducts(data);
      } catch (error) {
        console.error("❌ Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
