import React from 'react';
import Button from '../atoms/Button';
import { formatPrice } from '../../utils/formatters';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow overflow-hidden">

      {/* ARREGLO DE FOTOS:
         1. h-64: Altura fija (bastante alta para que luzca).
         2. w-full: Ancho total.
         3. object-cover: La magia. Hace que la foto llene el cuadro sin estirarse.
      */}
      <div className="h-64 w-full bg-gray-100 relative overflow-hidden group">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Etiqueta opcional de categoría sobre la foto (estilo moderno) */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-white/90 text-green-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wide">
            {product.category}
          </span>
        )}
      </div>

      {/* Info del Producto */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight">
          {product.title}
        </h3>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 font-light">
          {product.description || 'Producto ideal para tu huerto en casa.'}
        </p>

        {/* Precio y Botón pegados al fondo */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <span className="text-xl font-bold text-green-600">
            {formatPrice(product.price)}
          </span>

          <Button
            onClick={() => onAddToCart(product)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg text-sm shadow-sm transition-transform active:scale-95"
          >
            Añadir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
