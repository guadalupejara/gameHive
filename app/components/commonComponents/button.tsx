
import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Button = ({
  label,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      type={type}
      className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-md ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;


