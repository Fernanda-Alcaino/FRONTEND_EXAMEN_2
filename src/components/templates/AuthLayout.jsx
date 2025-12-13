import { Link } from 'react-router-dom';
import React from 'react'; // <--- AGREGAR ESTO
const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">

        {/* Cabecera simple para volver al Home */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition">
            🔥 Mi Tienda
          </Link>
          {title && <h2 className="mt-2 text-gray-500">{title}</h2>}
        </div>

        {/* Aquí va el LoginForm (Organismo) */}
        {children}

        {/* Footer del Auth */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Credenciales de prueba:</p>
          <p>Admin: admin@tienda.com</p>
          <p>User: user@tienda.com</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
