import Navbar from '../organisms/Navbar';
import React from 'react'; // <--- AGREGAR ESTO

const AdminLayout = ({ children, user, logout, isAdmin }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Reutilizado */}
      <Navbar user={user} logout={logout} isAdmin={isAdmin} />

      {/* Barra de Título Específica de Admin */}
      <div className="bg-gray-800 text-white py-6 shadow-inner">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <p className="text-gray-400 text-sm">Gestión de inventario y ventas</p>
          </div>
          <div className="text-xs bg-red-600 text-white px-2 py-1 rounded uppercase font-bold tracking-wider">
            Admin Mode
          </div>
        </div>
      </div>

      {/* Contenido Principal (Tablas, Logs, etc.) */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
