import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import React from 'react'; // <--- AGREGAR ESTO
const AdminTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
        <tr>
          <th className="p-4 border-b">ID</th>
          <th className="p-4 border-b">Producto</th>
          <th className="p-4 border-b">Precio</th>
          <th className="p-4 border-b text-center">Acciones</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
        {products.length > 0 ? (
          products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition">
              <td className="p-4 text-gray-500 font-mono text-sm">#{product.id}</td>
              <td className="p-4 font-medium text-gray-800">{product.title}</td>
              <td className="p-4 text-green-600 font-bold">${product.price}</td>
              <td className="p-4 flex justify-center gap-2">
                <Button
                  variant="outline"
                  className="p-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => onEdit(product)}
                  title="Editar"
                >
                  <Icon name="edit" size={18} />
                </Button>
                <Button
                  variant="danger"
                  className="p-2"
                  onClick={() => onDelete(product.id)}
                  title="Eliminar"
                >
                  <Icon name="trash" size={18} />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="p-8 text-center text-gray-500">
              No hay productos registrados.
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
