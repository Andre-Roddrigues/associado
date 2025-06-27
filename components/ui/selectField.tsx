import React from 'react';

interface SelectFieldProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: string[];
  className?: string;
  placeholder?: string;
  name?: string;
}

export function SelectField({ icon, label, options, className, placeholder, name, value }: SelectFieldProps) {
  const selectId = name || 'select-field'; // Define um id para associar o label ao select

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={selectId} className='flex items-center text-muted-foreground'>
        {icon}
        <span className='ml-2'>{label}</span>
      </label>
      <select
        id={selectId}
        name={name} // Adiciona o nome do select
        className='mt-1 p-2 border rounded-md w-full'
        defaultValue=""
        aria-label={label} // Acessibilidade extra
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
