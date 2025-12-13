import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // 👈 IMPORTANTE: Para validar expiración

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Para esperar a verificar el token antes de mostrar la app

  // 1. Función auxiliar: Verifica si el token es válido y no ha expirado
  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime; // Retorna true si aún no vence
    } catch (error) {
      return false; // Si el token es basura o falla, es inválido
    }
  };

  // 2. Efecto de Carga Inicial (Persistencia Segura)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user_data');

    if (storedToken && storedUser) {
      if (isTokenValid(storedToken)) {
        // Token vivo: Restauramos sesión
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        // Token muerto: Limpieza automática
        console.warn("El token expiró. Cerrando sesión...");
        logout();
      }
    }
    setLoading(false);
  }, []);

  // 3. Función de Login (Recibe datos REALES del backend)
  // YA NO hacemos la validación hardcoded aquí. La página de Login llamará a la API
  // y le pasará a esta función el token y el usuario que responda el servidor.
  const login = (token, userData) => {
    setUser(userData);
    setIsAuthenticated(true);

    // Guardamos en LocalStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user_data', JSON.stringify(userData));
  };

  // 4. Función de Logout (Limpieza total)
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user_data');

    // Opcional: Si quieres forzar recarga o redirección
    // window.location.href = '/login';
  };

  const value = {
    user,
    token: localStorage.getItem('token'), // Por si algún componente lo pide
    isAuthenticated,
    isAdmin: user?.role === 'admin', // Tu magia para el Navbar
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
