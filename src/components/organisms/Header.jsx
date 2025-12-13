import React from 'react';

const Header = () => {
  return (
    <header className="relative w-full h-72 overflow-hidden bg-gray-800">
      {/* Imagen de fondo de Jardinería */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}
      ></div>

      {/* Texto superpuesto */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-3 text-shadow drop-shadow-lg">
          Cultiva tu Vida
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl text-green-50">
          Todo lo que necesitas para tu huerto urbano: semillas, herramientas y sustratos.
        </p>
        <div className="w-16 h-1 bg-green-400 mt-6 mx-auto rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
