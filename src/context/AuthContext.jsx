import React, { createContext, useState, useContext, useEffect } from 'react'; // <--- ¡AQUÍ ESTÁ LA MAGIA! Agregamos "React"

// 1. Crear el contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Efecto para persistencia (Recargar página y seguir logueado)
  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función de Login
  const login = (email, password) => {
    // --- SIMULACIÓN DE BACKEND ---
    // En un proyecto real, aquí harías: api.post('/login', { email, password })

    // Validar Admin (Hardcoded para la tarea)
    if (email === 'admin@tienda.com' && password === 'admin123') {
      const adminUser = { email, role: 'admin', token: 'fake-jwt-token-admin' };
      saveUser(adminUser);
      return { success: true };
    }

    // Validar Usuario Normal
    if (email === 'user@tienda.com' && password === '1234') {
      const normalUser = { email, role: 'user', token: 'fake-jwt-token-user' };
      saveUser(normalUser);
      return { success: true };
    }

    return { success: false, message: 'Credenciales inválidas' };
  };

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user_data', JSON.stringify(userData));
    localStorage.setItem('token', userData.token); // Para los interceptors de axios
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirección forzada
  };

  // Valor exportado
  const value = {
    user,
    isAdmin: user?.role === 'admin', // Propiedad mágica para tu Navbar
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usarlo rápido
export const useAuth = () => useContext(AuthContext);
