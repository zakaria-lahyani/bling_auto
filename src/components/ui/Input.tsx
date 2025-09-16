import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`
        w-full px-3 py-2 border border-border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
        placeholder:text-content-muted
        disabled:bg-surface-muted disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  )
}

export default Input