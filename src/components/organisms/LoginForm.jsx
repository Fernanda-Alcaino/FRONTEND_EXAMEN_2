import { useState } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import React from 'react'; // <--- AGREGAR ESTO

const LoginForm = ({ onLogin, error }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials.email, credentials.password);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Bienvenido de nuevo</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormField
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="ej: admin@tienda.com"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <FormField
          label="Contraseña"
          type="password"
          name="password"
          placeholder="******"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="primary" className="w-full mt-4">
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
