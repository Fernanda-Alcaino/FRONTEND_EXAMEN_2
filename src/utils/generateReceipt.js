export const generateReceipt = ({
                                  cart,
                                  total,
                                  email,
                                  direccion,
                                  metodoPago,
                                  cuotas
                                }) => {
  return {
    id: Math.floor(Math.random() * 1000000),
    fecha: new Date().toLocaleString(),
    email,
    direccion,
    metodoPago,
    cuotas: metodoPago === "credito" ? cuotas : "N/A",
    items: cart,
    total
  };
};
