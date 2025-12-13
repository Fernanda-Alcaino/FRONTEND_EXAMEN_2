import Icon from '../atoms/Icon';
import React from 'react'; // <--- AGREGAR ESTO

const SalesLog = ({ sales }) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Cabecera del Log */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-700">Registro de Ventas Recientes</h3>
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Total Ventas: {sales.length}
        </span>
      </div>

      {/* Lista de Ventas */}
      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <div key={sale.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">

              {/* Icono + Info Usuario */}
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <Icon name="cart" size={16} /> {/* Reusamos el icono cart como símbolo de venta */}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{sale.userEmail}</p>
                  <p className="text-xs text-gray-500">{sale.date}</p>
                </div>
              </div>

              {/* ID de Compra y Total */}
              <div className="text-right">
                <p className="text-xs text-gray-400 font-mono mb-1">ID: {sale.id}</p>
                <p className="font-bold text-gray-900">+ ${sale.total.toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-400">
            No hay ventas registradas aún.
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesLog;
