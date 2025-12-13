import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react'; // <--- AGREGAR ESTO
// Templates & Organisms
import AuthLayout from '../components/templates/AuthLayout';
import LoginForm from '../components/organisms/LoginForm';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = (email, password) => {
    const result = login(email, password);

    if (result.success) {
      // Redirección inteligente basada en el rol
      if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <AuthLayout title="Acceso de Usuarios">
      <LoginForm onLogin={handleLogin} error={error} />
    </AuthLayout>
  );
};

export default Login;
