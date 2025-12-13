import React from 'react';
// 👇 Importamos la utilidad que acabamos de crear
import { formatPrice } from '../../utils/formatters';
import Button from '../atoms/Button'; // Asumiendo que tienes este botón
import { API_URL } from '../../services/api';

const ProductCard = ({ product, onAddToCart }) => {
  // Manejo de la imagen: si viene del backend o es una URL externa
  const imagenSrc = product.image && !product.image.startsWith('http')
    ? `${API_URL}/uploads/${product.image}`
    : product.image;

  // Título seguro (para evitar el error que tuviste antes)
  const safeTitle = product.title || product.name || "Producto sin nombre";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Imagen */}
      <div className="h-48 overflow-hidden bg-gray-100 relative group">
        <img
          src={imagenSrc || 'https://via.placeholder.com/300?text=Sin+Imagen'}
          alt={safeTitle}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=Error+Imagen'; }}
        />
        {/* Badge de Categoría (Opcional) */}
        {product.category && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                {product.category}
            </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {safeTitle}
        </h3>

        {/* Descripción corta (si existe) */}
        {product.description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          {/* 👇 AQUÍ USAMOS formatPrice */}
          <span className="text-xl font-bold text-green-700">
                {formatPrice(product.price)}
            </span>

          <Button
            onClick={() => onAddToCart(product)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg"
          >
            Agregar 🛒
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
