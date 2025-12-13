import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import React from 'react'; // <--- AGREGAR ESTO

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex items-center justify-between border-b py-4 gap-4">
      {/* Imagen pequeña */}
      <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />

      {/* Título y Precio unitario */}
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h4>
        <span className="text-gray-500 text-sm">${item.price} c/u</span>
      </div>

      {/* Controles de Cantidad */}
      <div className="flex items-center gap-2">
        <Button variant="outline" className="px-2 py-1" onClick={() => onDecrease(item.id)}>-</Button>
        <span className="font-bold w-4 text-center">{item.qty}</span>
        <Button variant="outline" className="px-2 py-1" onClick={() => onIncrease(item.id)}>+</Button>
      </div>

      {/* Botón Eliminar */}
      <Button variant="danger" className="px-2 py-2" onClick={() => onRemove(item.id)}>
        <Icon name="trash" size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
