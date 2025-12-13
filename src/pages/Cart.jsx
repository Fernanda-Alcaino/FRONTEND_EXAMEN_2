import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import React from 'react'; // <--- AGREGAR ESTO
// Components (Atomic Design)
import MainLayout from '../components/templates/MainLayout';
import CartItem from '../components/molecules/CartItem';
import Button from '../components/atoms/Button';

const Cart = () => {
  // 1. Obtener datos del contexto global
  const { user, logout, isAdmin } = useAuth();
  const {
    cart,
    cartTotal,
    removeFromCart,
    increaseQty,
    decreaseQty,
    cartCount
  } = useCart();

  return (
    <MainLayout user={user} logout={logout} isAdmin={isAdmin} cartCount={cartCount}>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tu Carrito de Compras</h1>

      {/* CASO 1: Carrito Vacío */}
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500 text-xl mb-6">Tu carrito está vacío.</p>
          <p className="text-gray-400 mb-8">¿No sabes qué comprar? ¡Tenemos miles de productos!</p>
          <Link to="/">
            <Button variant="primary">Volver al Catálogo</Button>
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

            {/* Renderizado de items usando la Molécula */}
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
          <div className="w-full lg:w-96 bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">Resumen de la Orden</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío estimado</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-xl text-gray-900">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Acción Principal: Ir a Checkout */}
            <Link to="/checkout" className="block w-full">
              <Button variant="primary" className="w-full py-3 text-lg shadow-lg shadow-blue-200">
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
