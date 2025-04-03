import React from 'react';

interface Props {
  htmlFor?: string
  className?: string
  children: React.ReactNode
}

const Label: React.FC<Props> = ({
  htmlFor = '',
  className = '',
  children,
  ...rest
}) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-semibold mb-3 ${className}`} {...rest}>{children}</label>
  )
}

export default Label;