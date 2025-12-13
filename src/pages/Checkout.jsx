import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/templates/MainLayout";
import Button from "../components/atoms/Button";
import Boleta from "../components/organisms/Boleta";
// 👇 Importamos el formateador
import { formatPrice } from "../utils/formatters";

const Checkout = () => {
  const { cart, cartTotal, clearCart, cartCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Envío
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [comuna, setComuna] = useState("");
  const [region, setRegion] = useState("");

  // Pago
  const [metodoPago, setMetodoPago] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fecha, setFecha] = useState("");
  const [cvv, setCvv] = useState("");
  const [cuotas, setCuotas] = useState("1");

  const [showReceipt, setShowReceipt] = useState(false);

  // Validaciones
  const isEmailValid = email.includes("@");
  const isDireccionValid = direccion.trim().length > 5;
  const isComunaValid = comuna.trim().length > 2;
  const isRegionValid = region !== "";

  // Validación de tarjeta (básica)
  const isTarjetaValid = metodoPago ? numeroTarjeta.length === 16 : false;
  const isFechaValid = metodoPago ? /^(0[1-9]|1[0-2])\/\d{2}$/.test(fecha) : false;
  const isCVVValid = metodoPago ? cvv.length === 3 : false;

  // Si no ha seleccionado método, el formulario no es válido
  const isFormValid =
    isEmailValid &&
    isDireccionValid &&
    isComunaValid &&
    isRegionValid &&
    metodoPago &&
    isTarjetaValid &&
    isFechaValid &&
    isCVVValid;

  if (cart.length === 0 && !showReceipt) {
    return (
      <MainLayout user={user} logout={logout} isAdmin={isAdmin} cartCount={cartCount}>
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 mb-6">Tu carrito está vacío</p>
          <Link to="/">
            <Button variant="primary">Volver al catálogo</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleConfirm = () => {
    if (!isFormValid) return;
    setShowReceipt(true);
  };

  return (
    <MainLayout user={user} logout={logout} isAdmin={isAdmin} cartCount={cartCount}>
      <div className="max-w-3xl mx-auto py-10">

        {showReceipt ? (
          <Boleta
            items={cart}
            total={cartTotal}
            clientEmail={email}
            onFinish={() => {
              clearCart();
              navigate("/");
            }}
          />
        ) : (
          <div className="bg-white p-8 rounded-xl shadow border border-gray-200">

            {/* HEADER */}
            <h1 className="text-2xl font-bold mb-8 flex justify-between items-center border-b pb-4">
              <span>Checkout</span>
              <div className="text-right">
                <span className="block text-sm text-gray-500">Total a pagar</span>
                <span className="text-green-600 text-2xl font-bold">
                  {/* 👇 USO CORRECTO DE FORMAT PRICE */}
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </h1>

            {/* ENVÍO */}
            <section className="mb-8">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                📦 1. Datos de Envío
              </h2>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Dirección (Calle y número)"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Comuna"
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                    value={comuna}
                    onChange={(e) => setComuna(e.target.value)}
                  />

                  <select
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none bg-white"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="">Selecciona Región</option>
                    <option value="RM">Región Metropolitana</option>
                    <option value="V">Valparaíso</option>
                    <option value="VIII">Biobío</option>
                    {/* Agrega más regiones si necesitas */}
                  </select>
                </div>
              </div>
            </section>

            {/* MÉTODO DE PAGO */}
            <section className="mb-8">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                💳 2. Método de Pago
              </h2>

              <div className="flex gap-4 mb-6">
                {["debito", "credito"].map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setMetodoPago(tipo)}
                    className={`flex-1 py-3 border rounded-lg font-semibold transition-all
                      ${metodoPago === tipo
                      ? "bg-green-600 text-white border-green-600 shadow-md transform -translate-y-1"
                      : "bg-white border-gray-300 text-gray-600 hover:border-green-500 hover:text-green-600"}
                    `}
                  >
                    {tipo === "debito" ? "Redcompra / Débito" : "Tarjeta de Crédito"}
                  </button>
                ))}
              </div>

              {/* Formulario de tarjeta (Se muestra solo si hay método seleccionado) */}
              {metodoPago && (
                <div className="space-y-4 bg-gray-50 p-6 rounded-lg border animate-fade-in">
                  <input
                    type="text"
                    placeholder="Número de Tarjeta (16 dígitos)"
                    className="w-full border rounded-lg p-3 bg-white"
                    value={numeroTarjeta}
                    maxLength={16}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setNumeroTarjeta(value);
                    }}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="border rounded-lg p-3 bg-white"
                      value={fecha}
                      maxLength={5}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^\d/]/g, "");
                        // Auto-slash lógica simple
                        if (value.length === 2 && !value.includes('/')) value = value + '/';
                        setFecha(value);
                      }}
                    />

                    <input
                      type="text"
                      placeholder="CVV (3 dígitos)"
                      className="border rounded-lg p-3 bg-white"
                      value={cvv}
                      maxLength={3}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setCvv(value);
                      }}
                    />
                  </div>

                  {metodoPago === "credito" && (
                    <div className="mt-4 pt-4 border-t">
                      <label className="font-semibold text-sm mb-2 block text-gray-700">
                        Cantidad de Cuotas
                      </label>
                      <select
                        className="w-full border rounded-lg p-3 bg-white"
                        value={cuotas}
                        onChange={(e) => setCuotas(e.target.value)}
                      >
                        <option value="1">1 cuota (Sin interés)</option>
                        <option value="3">3 cuotas</option>
                        <option value="6">6 cuotas</option>
                        <option value="12">12 cuotas</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div className="border-t pt-6">
              <Button
                variant="primary"
                className={`w-full py-4 text-lg shadow-lg font-bold transition-all ${
                  !isFormValid
                    ? "opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                    : "hover:-translate-y-1 hover:shadow-xl"
                }`}
                disabled={!isFormValid}
                onClick={handleConfirm}
              >
                {/* 👇 TEXTO DINÁMICO CON PRECIO */}
                {isFormValid
                  ? `Confirmar Compra (${formatPrice(cartTotal)})`
                  : "Completa los datos para continuar"}
              </Button>
            </div>

          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Checkout;
