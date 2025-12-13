import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext'; // <--- Usamos el contexto
import MainLayout from '../components/templates/MainLayout';
import ProductGrid from '../components/organisms/ProductGrid';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const { user, logout, isAdmin } = useAuth();
  const { addToCart, cartCount } = useCart();
  const { products } = useProducts(); // <--- Traemos los productos globales
  const { loading } = useFetch('/products');

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
        {/* Usamos 'products' del contexto en lugar de la lista fija */}
        <ProductGrid
          products={products}
          loading={false} // Ya no cargamos de API externa visualmente
          onAddToCart={(p) => addToCart(p)}
        />
      </div>

    </MainLayout>
  );
};

export default Home;
