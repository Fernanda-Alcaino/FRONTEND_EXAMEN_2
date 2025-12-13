import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/templates/MainLayout";
import Button from "../components/atoms/Button";
import Boleta from "../components/organisms/Boleta";

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
  const isTarjetaValid = numeroTarjeta.length === 16;
  const isFechaValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(fecha);
  const isCVVValid = cvv.length === 3;

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
          <div className="bg-white p-8 rounded-xl shadow border">

            {/* HEADER */}
            <h1 className="text-2xl font-bold mb-8 flex justify-between">
              <span>Checkout</span>
              <span className="text-right">
                <span className="block text-sm text-gray-500">Total a pagar</span>
                <span className="text-green-600 text-xl font-bold">
                  ${cartTotal.toFixed(0)}
                </span>
              </span>
            </h1>

            {/* ENVÍO */}
            <section className="mb-8">
              <h2 className="font-semibold text-lg mb-4">1. Datos de Envío</h2>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full border rounded-lg p-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Dirección"
                  className="w-full border rounded-lg p-3"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Comuna"
                    className="border rounded-lg p-3"
                    value={comuna}
                    onChange={(e) => setComuna(e.target.value)}
                  />

                  <select
                    className="border rounded-lg p-3"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="">Región</option>
                    <option value="RM">Región Metropolitana</option>
                    <option value="V">Valparaíso</option>
                    <option value="VIII">Biobío</option>
                  </select>
                </div>
              </div>
            </section>

            {/* MÉTODO DE PAGO */}
            <section className="mb-8">
              <h2 className="font-semibold text-lg mb-4">2. Método de Pago</h2>

              <div className="flex gap-4 mb-6">
                {["debito", "credito"].map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setMetodoPago(tipo)}
                    className={`flex-1 py-3 border rounded-lg font-semibold
                      ${metodoPago === tipo
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white border-gray-300 hover:border-green-500"}
                    `}
                  >
                    {tipo === "debito" ? "Débito" : "Crédito"}
                  </button>
                ))}
              </div>

              {metodoPago && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="1234567890123456"
                    className="w-full border rounded-lg p-3"
                    value={numeroTarjeta}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 16) setNumeroTarjeta(value);
                    }}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="border rounded-lg p-3"
                      value={fecha}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d/]/g, "");
                        if (value.length <= 5) setFecha(value);
                      }}
                    />

                    <input
                      type="text"
                      placeholder="CVV"
                      className="border rounded-lg p-3"
                      value={cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 3) setCvv(value);
                      }}
                    />
                  </div>
                </div>
              )}

              {metodoPago === "credito" && (
                <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
                  <label className="font-semibold text-sm mb-2 block">
                    Cantidad de Cuotas
                  </label>
                  <select
                    className="w-full border rounded-lg p-3"
                    value={cuotas}
                    onChange={(e) => setCuotas(e.target.value)}
                  >
                    <option value="1">1 cuota</option>
                    <option value="3">3 cuotas sin interés</option>
                    <option value="6">6 cuotas</option>
                    <option value="12">12 cuotas</option>
                  </select>
                </div>
              )}
            </section>

            <div className="border-t pt-6">
              <Button
                variant="primary"
                className={`w-full py-4 text-lg ${
                  !isFormValid && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
                onClick={handleConfirm}
              >
                Confirmar Compra
              </Button>
            </div>

          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Checkout;
