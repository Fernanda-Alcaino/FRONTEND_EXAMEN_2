// 👇 ESTA LÍNEA ES LA QUE FALTABA
import React from 'react';
import { API_URL } from '../../services/api';

const ProductCard = ({ product, onAddToCart }) => {

  // Lógica para que la imagen se vea bien (sea local o URL completa)
  const imagenSrc = product.image && !product.image.startsWith('http')
    ? `${API_URL}/uploads/${product.image}`
    : product.image;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
      <div className="h-40 w-full flex items-center justify-center mb-4 overflow-hidden rounded-md bg-gray-100">
        <img
          src={imagenSrc || 'https://via.placeholder.com/150'}
          alt={product.name}
          className="object-contain h-full w-full"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Si falla, pone una gris
        />
      </div>

      <h3 className="font-bold text-lg text-gray-800 mb-1 text-center">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-3 text-center line-clamp-2">{product.description}</p>

      <div className="mt-auto w-full">
        <div className="text-xl font-bold text-green-600 text-center mb-3">
          ${product.price}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>🛒</span> Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
