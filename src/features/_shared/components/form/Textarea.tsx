import React from 'react';

interface Props {
  id?: string
  placeholder?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  className?: string
}

const Textarea: React.FC<Props> = ({
  id,
  placeholder,
  value,
  onChange,
  className = '',
  ...rest
}) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded border-gray-300 border-opacity-25 focus:border-gray-500 focus:outline-none ${className}`}
      {...rest}
    />
  )
}

export default Textarea;