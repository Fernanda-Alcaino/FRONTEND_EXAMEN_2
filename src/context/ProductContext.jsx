import React, { createContext, useState, useContext } from 'react';

// Importamos las imágenes aquí para compartirlas
import imgMacetero from '../assets/image/macetero.jpg';
import imgHerramientas from '../assets/image/herramientas.jpg';
import imgTierra from '../assets/image/tierradehoja.jpg';
import imgTomates from '../assets/image/tomates.jpg';

const ProductContext = createContext();

// Datos Iniciales
const INITIAL_PRODUCTS = [
  { id: 1, title: 'Semillas Tomate Cherry', price: 2990, stock: 45, category: 'Semillas', description: 'Sobre de 50 semillas orgánicas.', image: imgTomates },
  { id: 2, title: 'Kit Herramientas', price: 15990, stock: 12, category: 'Herramientas', description: 'Incluye pala, rastrillo y tijeras.', image: imgHerramientas },
  { id: 3, title: 'Tierra de Hoja 10L', price: 4500, stock: 30, category: 'Tierra', description: 'Sustrato natural enriquecido.', image: imgTierra },
  { id: 4, title: 'Macetero Cerámica', price: 8900, stock: 8, category: 'Macetas', description: 'Macetero artesanal esmaltado.', image: imgMacetero },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Función para agregar o editar
  const saveProduct = (product) => {
    // Si ya tiene ID y existe, lo actualizamos
    if (products.some(p => p.id === product.id)) {
      const updated = products.map(p => p.id === product.id ? product : p);
      // Ordenar por ID
      setProducts(updated.sort((a, b) => a.id - b.id));
    } else {
      // Si es nuevo, lo agregamos
      setProducts([...products, product].sort((a, b) => a.id - b.id));
    }
  };

  // Función para eliminar
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, saveProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
