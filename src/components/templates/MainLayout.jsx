import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

const MainLayout = ({ children, user, logout, isAdmin, cartCount }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar
        user={user}
        logout={logout}
        isAdmin={isAdmin}
        cartCount={cartCount}
      />

      {/* EL HEADER DE IMAGEN SE ELIMINÓ PARA QUE SE PAREZCA A LA FOTO */}

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
