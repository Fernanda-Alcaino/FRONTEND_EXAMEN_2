import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import MainLayout from '../components/templates/MainLayout';
import ProductGrid from '../components/organisms/ProductGrid';

const Home = () => {
  const { user, logout, isAdmin } = useAuth();
  const { addToCart, cartCount } = useCart();

  // Ahora obtenemos productos Y el estado de loading directamente del contexto
  const { products, loading } = useProducts();

  return (
    <MainLayout user={user} logout={logout} isAdmin={isAdmin} cartCount={cartCount}>

      <div className="text-center pt-10 pb-12">
        <h1 className="text-4xl font-bold text-green-600 mb-3 tracking-tight">
          Bienvenidos a Huerto Hogar
        </h1>
        <p className="text-gray-500 text-lg font-light">
          Todo lo que necesitas para tu jardín en un solo lugar.
        </p>
      </div>

      <div className="mb-20 px-4">
        {/* Pasamos los datos reales del backend */}
        <ProductGrid
          products={products}
          loading={loading} // ¡Ahora sí pasamos el loading real!
          onAddToCart={(p) => addToCart(p)}
        />
      </div>

    </MainLayout>
  );
};

export default Home;
