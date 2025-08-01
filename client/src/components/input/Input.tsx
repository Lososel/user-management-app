import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  labelText: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  labelText,
  id,
  type = 'text',
  placeholder,
  value,
  disabled = false,
  register,
  error,
  autoComplete,
  onChange,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{labelText}</label>
      <input
        id={id}
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        {...register}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default Input;
