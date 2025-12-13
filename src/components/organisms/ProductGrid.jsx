import React from 'react';
import ProductCard from '../molecules/ProductCard';

const ProductGrid = ({ products, loading, onAddToCart }) => {
  // 1. Estado de Carga (Skeleton o Loader bonito)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
        <p className="text-green-800 font-medium animate-pulse">Cargando tu huerto...</p>
      </div>
    );
  }

  // 2. Sin resultados
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 bg-green-50 rounded-2xl border-2 border-dashed border-green-200 mx-auto max-w-2xl">
        <p className="text-2xl mb-2">🌱</p>
        <p className="text-gray-500 font-medium">No encontramos productos en esta categoría.</p>
      </div>
    );
  }

  // 3. Grilla Organizada
  return (
    // CAMBIO: gap-8 para más aire, y configuración responsive precisa
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
      {products.map((product) => (
        <div key={product.id} className="w-full h-full">
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
