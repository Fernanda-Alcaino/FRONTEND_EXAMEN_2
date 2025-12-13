import { useEffect, useState } from 'react';
// Importamos la molécula (Asegúrate de tener creado ProductCard)
import ProductCard from '../molecules/ProductCard';
import { getProducts, deleteProduct } from '../../services/api';

const GaleriaHuerto = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 1. Cargar productos al iniciar
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const data = await getProducts();
      setProductos(data);
    } catch (err) {
      setError('Error al cargar el huerto.');
    } finally {
      setCargando(false);
    }
  };

  // 2. Función para eliminar (Se la pasaremos a la molécula)
  const handleEliminar = async (id) => {
    // Confirmación simple del navegador
    if (window.confirm('¿Estás seguro que deseas eliminar este cultivo?')) {
      const exito = await deleteProduct(id);
      if (exito) {
        // Truco Pro: Filtramos la lista local para no tener que volver a pedir todo al backend
        setProductos(prev => prev.filter(prod => prod.id !== id));
      } else {
        alert('No se pudo eliminar el producto.');
      }
    }
  };

  // 3. Renderizado (Lo que se ve en pantalla)
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
        🌿 Mis Cultivos
      </h2>

      {/* Estado de Carga */}
      {cargando && <p style={{ textAlign: 'center' }}>Cargando huerto...</p>}

      {/* Estado de Error */}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {/* Lista de Productos */}
      {!cargando && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Grid Responsiva
          gap: '20px'
        }}>
          {productos.length > 0 ? (
            productos.map((prod) => (
              // LLAMAMOS A LA MOLÉCULA AQUÍ
              <ProductCard
                key={prod.id}
                product={prod}
                onDelete={handleEliminar}
              />
            ))
          ) : (
            <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>
              No hay cultivos registrados aún. ¡Agrega uno!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GaleriaHuerto;
