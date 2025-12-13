import Label from '../atoms/Label';
import Input from '../atoms/Input';
import React from 'react'; // <--- AGREGAR ESTO
const FormField = ({ label, type, name, value, onChange, placeholder, required }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormField;
