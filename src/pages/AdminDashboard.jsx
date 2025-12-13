import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { useSales } from "../context/SalesContext";
import AdminLayout from "../components/templates/AdminLayout";
import Button from "../components/atoms/Button";
import { formatPrice } from "../utils/formatters";
import imgMacetero from "../assets/image/macetero.jpg";

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const { products, saveProduct, deleteProduct } = useProducts();
  const { sales } = useSales();

  const [activeTab, setActiveTab] = useState("inventory");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    id: null,
    title: "",
    price: "",
    category: "",
    image: "",
    stock: 0,
  });

  /* ---------------- INVENTARIO ---------------- */

  const handleOpenCreate = () => {
    setProductForm({ id: null, title: "", price: "", category: "", image: "", stock: 0 });
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
    if (!productForm.title || !productForm.price) return alert("Datos incompletos");

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
    alert(productForm.id ? "✅ Producto actualizado" : "✅ Producto creado");
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar producto?")) deleteProduct(id);
  };

  /* ---------------- UI ---------------- */

  return (
    <AdminLayout user={user} logout={logout} isAdmin={isAdmin}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Panel Admin</h1>
          <p className="text-gray-500">Bienvenido, {user?.email}</p>
        </div>

        <Link to="/">
          <Button variant="outline" className="text-green-600 border-green-600">
            🏠 Volver a la tienda
          </Button>
        </Link>
      </div>

      {/* TABS */}
      <div className="flex gap-6 mb-8 border-b">
        <button
          onClick={() => setActiveTab("inventory")}
          className={`pb-3 font-semibold ${
            activeTab === "inventory"
              ? "border-b-2 border-green-600 text-green-600"
              : "text-gray-400"
          }`}
        >
          📦 Inventario
        </button>

        <button
          onClick={() => setActiveTab("sales")}
          className={`pb-3 font-semibold ${
            activeTab === "sales"
              ? "border-b-2 border-green-600 text-green-600"
              : "text-gray-400"
          }`}
        >
          📊 Registro de Ventas
        </button>
      </div>

      {/* ---------------- INVENTARIO ---------------- */}
      {activeTab === "inventory" && (
        <>
          <div className="flex justify-end mb-6">
            <Button onClick={handleOpenCreate} className="bg-green-600 text-white">
              + Nuevo Producto
            </Button>
          </div>

          <div className="bg-white rounded-xl border shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="p-4 text-left">Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
              </thead>
              <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 flex gap-4 items-center">
                    <img src={p.image} className="w-16 h-16 rounded object-cover" />
                    <div>
                      <p className="font-bold">{p.title}</p>
                      <p className="text-xs text-gray-400">Stock: {p.stock}</p>
                    </div>
                  </td>
                  <td className="p-4 text-center">{p.category}</td>
                  <td className="p-4 text-green-600 font-bold text-center">
                    {formatPrice(p.price)}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleOpenEdit(p)}>✏️</button>
                      <button onClick={() => handleDelete(p.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ---------------- REGISTRO DE VENTAS ---------------- */}
      {activeTab === "sales" && (
        <div className="bg-white rounded-xl border shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase">
            <tr>
              <th className="p-4">Orden</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Pago</th>
              <th className="p-4">Total</th>
            </tr>
            </thead>
            <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  No hay ventas registradas
                </td>
              </tr>
            ) : (
              sales.map((s, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-mono">#{s.orderId}</td>
                  <td className="p-4">{s.date}</td>
                  <td className="p-4">{s.email}</td>
                  <td className="p-4 uppercase">{s.method}</td>
                  <td className="p-4 font-bold text-green-600">
                    {formatPrice(s.total)}
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------------- MODAL PRODUCTO ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <form
            onSubmit={handleSaveProduct}
            className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4"
          >
            <h2 className="font-bold text-xl">
              {productForm.id ? "Editar Producto" : "Nuevo Producto"}
            </h2>

            <input
              name="title"
              value={productForm.title}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full border p-2 rounded"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleChange}
                placeholder="Precio"
                className="border p-2 rounded"
                required
              />

              <select
                name="category"
                value={productForm.category}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Categoría</option>
                <option>Semillas</option>
                <option>Herramientas</option>
                <option>Tierra</option>
                <option>Macetas</option>
              </select>
            </div>

            <input
              name="image"
              value={productForm.image}
              onChange={handleChange}
              placeholder="URL Imagen"
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={handleCloseModal} type="button">
                Cancelar
              </Button>
              <Button type="submit" className="bg-green-600 text-white flex-1">
                Guardar
              </Button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
