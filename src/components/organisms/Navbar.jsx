import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

const Navbar = ({ cartCount }) => {
  const { user, logout, isAdmin } = useAuth();
  const { cartTotal } = useCart();

  return (
    <nav className="bg-white sticky top-0 z-50 px-6 py-4 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group decoration-transparent">
          <span className="text-2xl">🌱</span>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-green-600 group-hover:text-green-700">HuertoHogar</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">POS System</span>
          </div>
        </Link>

        {/* LADO DERECHO */}
        <div className="flex items-center gap-6">

          {user ? (
            /* USUARIO LOGUEADO */
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link to="/admin">
                  <Button className="bg-gray-800 text-white text-xs px-3 py-1 hover:bg-black transition-colors">
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Button onClick={logout} variant="outline" className="text-xs px-3 py-1 border-gray-300 text-gray-500 hover:border-red-500 hover:text-red-500">
                Salir
              </Button>
            </div>
          ) : (
            /* USUARIO NO LOGUEADO (Aquí está el cambio) */
            <Link to="/login">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2 rounded text-sm transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5">
                Ingresar Admin
              </Button>
            </Link>
          )}

          {/* CARRITO */}
          <Link to="/cart" className="relative text-gray-800 hover:text-green-600 transition">
            <Icon name="cart" size={24} />
            {(cartTotal > 0 || true) && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                 {cartCount || 0}
               </span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
