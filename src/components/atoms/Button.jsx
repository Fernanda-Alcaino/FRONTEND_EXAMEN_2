import React from 'react';

const Button = ({
                  children,
                  onClick,
                  variant = 'primary',
                  type = 'button',
                  disabled = false,
                  className = ''
                }) => {

  // Estilos más modernos y saturados
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-red-200',
    success: 'bg-green-500 text-white hover:bg-green-600 shadow-md',
    outline: 'border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400',
    dark: 'bg-slate-900 text-white hover:bg-black shadow-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5 py-2 rounded-lg font-semibold transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${variants[variant] || variants.primary}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
