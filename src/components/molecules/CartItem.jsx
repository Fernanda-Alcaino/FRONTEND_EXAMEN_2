import React from 'react';
import Button from '../atoms/Button';
import { formatPrice } from '../../utils/formatters';
import { API_URL } from '../../services/api';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {

  // 1. LÓGICA DE SEGURIDAD (Para evitar NaN y recuadros vacíos)
  // Si item.quantity no existe, usamos 1 por defecto.
  const cantidad = item.quantity ? Number(item.quantity) : 1;

  // Aseguramos que el precio sea un número
  const precio = Number(item.price);

  // Calculamos el subtotal matemático antes de formatear
  const subtotal = precio * cantidad;

  // Lógica de imagen
  const imagenSrc = item.image && !item.image.startsWith('http')
    ? `${API_URL}/uploads/${item.image}`
    : item.image;

  const placeholderImage = 'https://via.placeholder.com/150?text=Sin+Imagen';

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 py-6 border-b border-gray-100 last:border-b-0 animate-fade-in">

      {/* === COLUMNA IZQUIERDA: FOTO Y DATOS === */}
      <div className="flex items-center gap-4 flex-1 w-full">
        {/* Foto */}
        <div className="flex-shrink-0 border rounded-lg overflow-hidden bg-gray-50 w-20 h-20 md:w-24 md:h-24 shadow-sm">
          <img
            src={imagenSrc || placeholderImage}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = placeholderImage; }}
          />
        </div>

        {/* Datos del producto */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-500 mb-1">{item.category || 'General'}</p>
          <span className="text-green-600 font-medium text-sm">
            Unitario: {formatPrice(precio)}
          </span>
        </div>
      </div>

      {/* === COLUMNA DERECHA: CANTIDAD Y TOTAL === */}
      <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto mt-4 md:mt-0">

        {/* SECCIÓN DE CANTIDAD */}
        <div className="flex flex-col items-center md:items-start">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                CANTIDAD
            </span>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => onDecrease(item.id)}
              disabled={cantidad <= 1}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition border-r text-xl"
            >
              -
            </button>

            {/* 👇 AQUÍ PONEMOS LA VARIABLE SEGURA 'cantidad' PARA LLENAR EL CUADRO */}
            <div className="w-12 h-10 flex items-center justify-center font-bold text-gray-800 bg-white">
              {cantidad}
            </div>

            <button
              onClick={() => onIncrease(item.id)}
              className="w-10 h-10 flex items-center justify-center text-green-600 hover:bg-green-50 transition border-l text-xl"
            >
              +
            </button>
          </div>
        </div>

        {/* SUB TOTAL DEL ITEM */}
        <div className="text-right min-w-[100px]">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                SUBTOTAL
            </span>
          {/* 👇 USAMOS LA VARIABLE 'subtotal' QUE CALCULAMOS ARRIBA */}
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(subtotal)}
          </p>

          <Button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 text-xs hover:underline p-0 mt-2 bg-transparent hover:bg-transparent shadow-none"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
