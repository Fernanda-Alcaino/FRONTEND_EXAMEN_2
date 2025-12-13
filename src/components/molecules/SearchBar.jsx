import { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import React from 'react'; // <--- AGREGAR ESTO
// Si tienes un icono de lupa en tu Icon.jsx, úsalo. Si no, usamos texto/emoji.

const SearchBar = ({ onSearch, placeholder = "Buscar..." }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg">
      <Input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="flex-1" // Para que ocupe todo el espacio disponible
      />
      <Button type="submit" variant="primary">
        Buscar
      </Button>
    </form>
  );
};

export default SearchBar;
