import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// 👇 Importamos la API configurada
import api from '../services/api';

// Templates & Organisms
import AuthLayout from '../components/templates/AuthLayout';
import LoginForm from '../components/organisms/LoginForm';

const Login = () => {
  const { login } = useAuth(); // Esta función espera (token, userData)
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // 👇 Ahora la función es ASYNC para poder esperar al backend
  const handleLogin = async (email, password) => {
    setError(null); // Limpiamos errores previos

    try {
      // ⚠️ CAMBIO AQUÍ: La ruta correcta en NestJS es '/auth/login'
      const response = await api.post('/auth/login', { email, password });

      // 2. Extraer datos de la respuesta del Backend
      // Tu backend NestJS devuelve: { token: "...", user: { email, role, ... } }
      const { token, user } = response.data;

      // Normalizamos los datos del usuario para guardarlos
      const userData = {
        email: user.email,
        role: user.role
      };

      // 3. Llamamos al login del Context (que guarda en localStorage y decodifica)
      login(token, userData);

      // 4. Redirección basada en el ROL REAL que vino de la base de datos
      if (userData.role === 'admin') {
        navigate('/admin'); // O '/dashboard'
      } else {
        navigate('/');
      }

    } catch (err) {
      console.error("Error de login:", err);
      // 5. Manejo de Errores
      if (err.response && err.response.status === 401) {
        setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
      } else {
        setError("Hubo un problema al conectar con el servidor.");
      }
    }
  };

  return (
    <AuthLayout title="Acceso de Usuarios">
      {/* LoginForm se encarga de los inputs y llama a handleLogin al hacer submit */}
      <LoginForm onLogin={handleLogin} error={error} />
    </AuthLayout>
  );
};

export default Login;
