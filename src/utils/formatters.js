export const formatPrice = (amount) => {
  // Si no hay precio, devolvemos $0
  if (!amount && amount !== 0) return "$0";

  // Formato chileno (es-CL): usa puntos para miles y coma para decimales.
  // Forzamos 0 decimales.
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
