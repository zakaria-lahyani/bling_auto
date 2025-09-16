import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
  options?: { value: string; label: string }[]
}

const Select: React.FC<SelectProps> = ({ className = '', options = [], children, ...props }) => {
  return (
    <select
      className={`
        w-full px-3 py-2 border border-border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
        disabled:bg-surface-muted disabled:cursor-not-allowed
        bg-white
        ${className}
      `}
      {...props}
    >
      {options.length > 0 
        ? options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        : children
      }
    </select>
  )
}

export default Select