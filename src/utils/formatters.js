export const formatPrice = (amount) => {
  // 1. Si no es un número válido, devolvemos $0
  if (amount === null || amount === undefined) return "$0";

  // 2. Convertimos a número y redondeamos para eliminar decimales matemáticamente
  const numericAmount = Math.round(Number(amount));

  // 3. Formateamos a peso chileno (sin decimales)
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};
