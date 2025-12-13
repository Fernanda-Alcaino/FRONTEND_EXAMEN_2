/**
 * Formatea un número como moneda sin decimales innecesarios.
 * Ejemplo: 2990 -> "$ 2.990"
 */
export const formatPrice = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '$ 0';
  }

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0, // Sin decimales mínimos
    maximumFractionDigits: 0, // Sin decimales máximos
  }).format(value);
};

/**
 * Formatea una fecha.
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};
