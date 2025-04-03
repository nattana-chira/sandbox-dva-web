import React from 'react';

interface InputProps {
  type?: string
  id?: string
  placeholder?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  className = '',
  ...rest
}) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded border-gray-300 border-opacity-25 focus:border-gray-500 focus:outline-none ${className}`}
      {...rest}
    />
  )
}

export default Input;