import axios from 'axios';

// 1. Definimos la URL (Si usas variable de entorno o directo localhost)
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// 2. Creamos la instancia de Axios
const api = axios.create({
  baseURL: BASE_URL,
});

// --- FUNCIONES ---

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
    console.error(error);
    return false;
  }
};

// 👇 ESTO FALTABA: Exportamos la URL para que la usen las imágenes
export const API_URL = BASE_URL;

// Exportamos la instancia por defecto
export default api;
