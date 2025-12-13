import axios from 'axios';

// 1. Crear la instancia de Axios con la URL base
const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // API pública para productos
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor de REQUEST (Salida)
// Se ejecuta ANTES de que la petición salga hacia el servidor
api.interceptors.request.use(
  (config) => {
    // Buscar el token guardado en el navegador
    const token = localStorage.getItem('token');

    // Si existe, lo inyectamos en los headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor de RESPONSE (Llegada)
// Se ejecuta CUANDO el servidor responde
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa (200-299), pasa directo
    return response;
  },
  (error) => {
    // Manejo global de errores

    // Si el error es 401 (Token inválido o expirado)
    if (error.response && error.response.status === 401) {
      console.warn('Sesión expirada o inválida. Cerrando sesión...');

      // Limpiar almacenamiento local
      localStorage.removeItem('token');
      localStorage.removeItem('user_data');

      // Forzar redirección al login
      // Usamos window.location porque aquí no tenemos acceso al router de React
      window.location.href = '/login';
    }

    // Propagar el error para que el componente (Home, Admin) pueda mostrar el mensaje rojo
    return Promise.reject(error);
  }
);

export default api;
