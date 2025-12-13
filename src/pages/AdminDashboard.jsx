import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { useSales } from "../context/SalesContext";
// 👇 IMPORTANTE: Importamos la URL de la API
import { API_URL } from "../services/api";
import AdminLayout from "../components/templates/AdminLayout";
import Button from "../components/atoms/Button";
import { formatPrice } from "../utils/formatters";
import imgMacetero from "../assets/image/macetero.jpg";

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const { products, saveProduct, deleteProduct } = useProducts();
  const { sales } = useSales();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    id: null,
    title: "",
    price: "",
    category: "",
    image: "",
    stock: 0,
  });

  // ---------------- MODAL ----------------
  const handleOpenCreate = () => {
    setProductForm({
      id: null,
      title: "",
      price: "",
      category: "",
      image: "",
      stock: 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setProductForm({ ...product });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price) {
      alert("Datos incompletos");
      return;
    }

    const productToSave = {
      ...productForm,
      price: Number(productForm.price),
      image: productForm.image || imgMacetero,
      stock: productForm.stock || Math.floor(Math.random() * 50) + 1,
      id: productForm.id
        ? productForm.id
        : products.length > 0
          ? Math.max(...products.map((p) => p.id)) + 1
          : 1,
    };

    saveProduct(productToSave);
    alert(productForm.id ? "Producto actualizado" : "Producto creado");
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar producto?")) {
      deleteProduct(id);
    }
  };

  // ---------------- RENDER ----------------
  return (
    <AdminLayout user={user} logout={logout} isAdmin={isAdmin}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Panel de Administración
          </h1>
          <p className="text-gray-500 mt-1">
            Gestión de inventario y registro de ventas
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/">
            <Button variant="outline">Volver a la tienda</Button>
          </Link>
          <Button onClick={handleOpenCreate}>+ Agregar producto</Button>
        </div>
      </div>

      {/* ================= INVENTARIO ================= */}
      <h2 className="text-2xl font-bold mb-4">Inventario</h2>

      <div className="bg-white rounded-xl shadow border overflow-hidden mb-16">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="p-4">Producto</th>
            <th className="p-4">Categoría</th>
            <th className="p-4">Precio</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
          </thead>
          <tbody className="divide-y">
          {products.map((p) => {
            // 👇 LÓGICA AGREGADA: Construir URL de imagen correctamente
            const imagenSrc = p.image && !p.image.startsWith('http')
              ? `${API_URL}/uploads/${p.image}`
              : p.image;

            return (
              <tr key={p.id}>
                <td className="p-4 flex gap-4 items-center">
                  <img
                    src={imagenSrc || imgMacetero}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded border"
                    onError={(e) => { e.target.src = imgMacetero; }} // Si falla, usa macetero por defecto
                  />
                  <div>
                    <p className="font-bold">{p.title}</p>
                    <p className="text-xs text-gray-400">ID {p.id}</p>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        Stock {p.stock}
                      </span>
                  </div>
                </td>
                <td className="p-4">{p.category}</td>
                <td className="p-4 font-bold text-green-700">
                  {formatPrice(p.price)}
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => handleOpenEdit(p)}>✏️</button>
                    <button onClick={() => handleDelete(p.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>

      {/* ================= REGISTRO DE VENTAS ================= */}
      <h2 className="text-2xl font-bold mb-4">Registro de Compras</h2>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 uppercase text-xs">
          <tr>
            <th className="p-4">Fecha</th>
            <th className="p-4">Email</th>
            <th className="p-4">Método</th>
            <th className="p-4">Total</th>
          </tr>
          </thead>
          <tbody className="divide-y">
          {sales.length === 0 && (
            <tr>
              <td colSpan="4" className="p-6 text-center text-gray-400">
                No hay ventas registradas
              </td>
            </tr>
          )}

          {sales.map((sale, index) => (
            <tr key={index}>
              <td className="p-4">
                {new Date(sale.date).toLocaleDateString()}
              </td>
              <td className="p-4">{sale.clientEmail}</td>
              <td className="p-4 capitalize">{sale.paymentMethod}</td>
              <td className="p-4 font-bold text-green-700">
                ${sale.total}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              {productForm.id ? "Editar producto" : "Nuevo producto"}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <input
                name="title"
                value={productForm.title}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleChange}
                placeholder="Precio"
                className="w-full border p-2 rounded"
              />
              <input
                name="category"
                value={productForm.category}
                onChange={handleChange}
                placeholder="Categoría"
                className="w-full border p-2 rounded"
              />
              <input
                name="image"
                value={productForm.image}
                onChange={handleChange}
                placeholder="URL imagen (ej: tomate.jpg)"
                className="w-full border p-2 rounded"
              />

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
