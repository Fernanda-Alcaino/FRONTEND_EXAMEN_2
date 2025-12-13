import axios from 'axios';

// 1. Definimos la URL (Mantenemos tu lógica de variables de entorno)
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// 2. Creamos la instancia de Axios con headers por defecto
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- INTERCEPTORES (La parte de Seguridad JWT) ---

// A. Interceptor de Solicitud (Request): Inyecta el token en CADA petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// B. Interceptor de Respuesta (Response): Detecta si el token venció (Error 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el backend responde "401 Unauthorized", significa que el token expiró o es falso
    if (error.response && error.response.status === 401) {
      console.warn("Sesión expirada. Cerrando sesión...");

      // Limpieza automática (Logout forzado)
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Redirigir al login para que el usuario entre de nuevo
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- TUS FUNCIONES EXISTENTES ---

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data; // Importante: Retornar los datos
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error("Error eliminando producto:", error);
    return false;
  }
};

// Exportamos la URL para que la usen las imágenes en otros componentes
export const API_URL = BASE_URL;

// Exportamos la instancia configurada por defecto
export default api;
