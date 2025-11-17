import React from 'react';
import { EyeIcon, EyeOffIcon } from './icons';

interface InputFieldProps {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
  isPassword?: boolean;
  passwordVisible?: boolean;
  onToggleVisibility?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ 
  icon, 
  type, 
  placeholder, 
  value, 
  onChange, 
  required = true, 
  name,
  isPassword = false,
  passwordVisible = false,
  onToggleVisibility 
}) => {
  const inputType = isPassword ? (passwordVisible ? 'text' : 'password') : type;

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
      </span>
      <input
        name={name}
        type={inputType}
        className={`w-full pl-10 ${isPassword ? 'pr-10' : 'pr-3'} py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {isPassword && onToggleVisibility && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={onToggleVisibility}
          aria-label={passwordVisible ? "Hide password" : "Show password"}
        >
          {passwordVisible ? (
            <EyeOffIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;