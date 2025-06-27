import React from 'react';

interface DateInputProps {
  label?: string;
  placeholder?: string;
  register: any; // Ajuste o tipo conforme necessário
  errorMessage?: string;
}

const DateInput: React.FC<DateInputProps> = ({ label, placeholder, register, errorMessage }) => {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <label className="block mt- text-sm font-light ">{label}</label>
      <input
        type="date"
        placeholder={placeholder}
        className="border  rounded p-2 text-muted-foreground focus:outline-0 focus:ring-[1px] focus:ring-primary"
        {...register}
      />
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};

export default DateInput;
