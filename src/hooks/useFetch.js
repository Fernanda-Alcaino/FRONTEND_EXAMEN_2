import { useState, useEffect, useCallback } from 'react';
import api from '../services/api'; // Importamos la instancia de Axios configurada

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función memoizada para poder llamarla manualmente (ej: después de borrar un producto)
  const fetchData = useCallback(async () => {
    // Si no hay endpoint (ej: esperamos a tener un ID), no hacemos nada
    if (!endpoint) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err) {
      console.error("Error en useFetch:", err);
      setError(err.message || 'Ocurrió un error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Ejecutar automáticamente cuando cambia el endpoint (ej: cambiar de página)
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
