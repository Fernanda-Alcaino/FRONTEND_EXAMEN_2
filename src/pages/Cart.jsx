import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
// Importamos el formateador
import { formatPrice } from '../utils/formatters';

// Components
import MainLayout from '../components/templates/MainLayout';
import CartItem from '../components/molecules/CartItem';
import Button from '../components/atoms/Button';

const Cart = () => {
  const { user, logout, isAdmin } = useAuth();
  const {
    cart,
    cartTotal,
    removeFromCart,
    increaseQty,
    decreaseQty,
    cartCount // 👈 Usamos esta variable que nos dice el total de items (ej: 5)
  } = useCart();

  const totalAPagar = cartTotal || 0;

  return (
    <MainLayout user={user} logout={logout} isAdmin={isAdmin} cartCount={cartCount}>

      {/* 1. TÍTULO CON CONTADOR DE PRODUCTOS */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
        <span>🛒 Tu Carrito de Compras</span>
        {cartCount > 0 && (
          <span className="bg-green-100 text-green-800 text-lg font-medium px-3 py-1 rounded-full">
            {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
          </span>
        )}
      </h1>

      {/* CASO 1: Carrito Vacío */}
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300 animate-fade-in">
          <div className="text-6xl mb-4">🤷‍♂️</div>
          <p className="text-gray-500 text-xl mb-6">Tu carrito está vacío.</p>
          <Link to="/">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
              Volver al Catálogo
            </Button>
          </Link>
        </div>
      ) : (
        /* CASO 2: Carrito con Productos */
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Columna Izquierda: Lista de Items */}
          <div className="flex-1 w-full bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="hidden md:flex justify-between border-b pb-2 mb-4 text-sm text-gray-500 font-semibold">
              <span>Producto</span>
              <span>Cantidad / Acciones</span>
            </div>

            <div className="divide-y">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={increaseQty}
                  onDecrease={decreaseQty}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>

          {/* Columna Derecha: Resumen de Totales */}
          <div className="w-full lg:w-96 bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">
              Resumen de la Orden
            </h3>

            <div className="space-y-3 mb-6">
              {/* 2. AGREGADO: CANTIDAD DE ARTÍCULOS EN EL RESUMEN */}
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Cantidad de artículos</span>
                <span className="text-gray-900">{cartCount}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalAPagar)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Envío estimado</span>
                <span className="text-green-600 font-medium">Gratis 🚚</span>
              </div>

              <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-xl text-gray-900 mt-2">
                <span>Total</span>
                <span className="text-green-700">{formatPrice(totalAPagar)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded shadow-lg shadow-green-100 transition-all transform hover:-translate-y-0.5">
                Ir a Pagar
              </Button>
            </Link>

            <div className="mt-4 text-xs text-center text-gray-400">
              <p>🔒 Compra 100% segura</p>
            </div>
          </div>

        </div>
      )}

    </MainLayout>
  );
};

export default Cart;
