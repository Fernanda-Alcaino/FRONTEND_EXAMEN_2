import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import MainLayout from '../components/templates/MainLayout';
import ProductGrid from '../components/organisms/ProductGrid';

const Home = () => {
  const { user, logout, isAdmin } = useAuth();
  const { addToCart, cartCount } = useCart();
  const { products, loading } = useProducts();

  // Estado solo para el buscador
  const [searchTerm, setSearchTerm] = useState("");

  // === SOLUCIÓN DEL ERROR ===
  // Usamos (product.title || "") para que si no tiene título, use un texto vacío
  // y no intente hacer toLowerCase() sobre undefined.
  const filteredProducts = products.filter((product) => {
    // Intentamos buscar por 'title' o por 'name' (por si acaso tu DB usa name)
    const productName = product.title || product.name || "";
    return productName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <MainLayout user={user} logout={logout} isAdmin={isAdmin} cartCount={cartCount}>

      <div className="text-center pt-10 pb-6">
        <h1 className="text-4xl font-bold text-green-600 mb-3 tracking-tight">
          Bienvenidos a Huerto Hogar
        </h1>
        <p className="text-gray-500 text-lg font-light mb-8">
          Todo lo que necesitas para tu jardín en un solo lugar.
        </p>

        {/* === BARRA DE BÚSQUEDA === */}
        <div className="max-w-xl mx-auto px-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Buscar producto (ej: Lechuga, Pala...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-5 pr-4 py-3 rounded-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all shadow-sm text-gray-700"
            />
            {/* Botón X para limpiar */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-20 px-4">

        {/* Mensaje si no hay resultados en la búsqueda */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-lg mx-auto max-w-2xl">
            <p className="text-3xl mb-2">🤷‍♂️</p>
            <p className="text-gray-500 text-lg">No encontramos productos con ese nombre.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-green-600 font-bold mt-2 hover:underline"
            >
              Ver todos los productos
            </button>
          </div>
        )}

        {/* === GRILLA ÚNICA DE PRODUCTOS === */}
        {filteredProducts.length > 0 && (
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            onAddToCart={(p) => addToCart(p)}
          />
        )}

      </div>
    </MainLayout>
  );
};

export default Home;
