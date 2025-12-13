import React, { useState } from "react";
import Button from "../atoms/Button";

const Boleta = ({ items, total, clientEmail, paymentMethod = "CRÉDITO", onFinish }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const orderNumber = Math.floor(70000 + Math.random() * 9999);
  const date = new Date().toLocaleString("es-CL");

  const handleSend = () => {
    setSending(true);

    // Simulación envío correo
    setTimeout(() => {
      setSending(false);
      setSent(true);
      if (onFinish) onFinish();
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">

      {/* HEADER VERDE */}
      <div className="bg-green-600 text-white text-center py-6">
        <div className="flex justify-center mb-2">
          <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-2xl">
            ✓
          </div>
        </div>
        <h2 className="text-xl font-bold">¡Pago Exitoso!</h2>
        <p className="text-sm opacity-90">Comprobante de Venta Electrónico</p>
      </div>

      {/* INFO ORDEN */}
      <div className="p-6 text-sm text-gray-700 border-b space-y-1">
        <div className="flex justify-between">
          <span className="font-semibold">N° Orden:</span>
          <span>#{orderNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Fecha:</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Método:</span>
          <span className="uppercase">{paymentMethod}</span>
        </div>
      </div>

      {/* DETALLE COMPRA */}
      <div className="p-6 border-b">
        <h3 className="font-semibold mb-3">Detalle de Compra:</h3>

        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.qty}x {item.title}
              </span>
              <span className="font-medium">
                ${(item.qty * item.price).toFixed(0)}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between font-bold text-lg mt-4 border-t pt-3">
          <span>TOTAL</span>
          <span>${total.toFixed(0)}</span>
        </div>
      </div>

      {/* CONFIRMACIÓN CORREO */}
      <div className="p-6 bg-gray-50 text-sm">
        <div className="flex items-start gap-2 mb-4">
          <span className="text-green-600 text-lg">✉️</span>
          <div>
            <p className="font-semibold">Comprobante enviado</p>
            <p className="text-gray-500">
              Copia enviada a: <strong>{clientEmail}</strong>
            </p>
          </div>
        </div>

        {!sent && (
          <Button
            variant="success"
            className="w-full py-3 text-base"
            disabled={sending}
            onClick={handleSend}
          >
            {sending ? "Enviando comprobante..." : "Reenviar comprobante"}
          </Button>
        )}

        {sent && (
          <p className="text-green-600 font-semibold text-center">
            ✔ Comprobante enviado correctamente
          </p>
        )}

        <Button
          className="w-full mt-4 bg-gray-800 text-white hover:bg-black"
          onClick={() => window.location.href = "/"}
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};

export default Boleta;
