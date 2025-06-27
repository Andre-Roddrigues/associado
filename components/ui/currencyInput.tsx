import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // Ícone opcional.
  label: string; // Rótulo do campo.
  placeholder: string;
  className?: string; // Classe adicional.
  errorMessage?: string; // Mensagem de erro opcional.
  alignRight?: boolean; // Define alinhamento à direita.
}

const formatNumeric = (value: string): string => {
  // Remove todos os caracteres não numéricos
  return value.replace(/[^0-9]/g, "");
};

const InputFieldCurrency = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      label,
      placeholder,
      errorMessage = "",
      className,
      alignRight = false,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = formatNumeric(e.target.value);
      setValue(numericValue);
    };

    return (
      <div className={cn("flex flex-col h-20 text-muted-foreground w-full", className)}>
        {/* Rótulo */}
        <Label className="text-sm mb-1 font-light">{label}</Label>
        <div className="relative">
          {/* Campo de entrada */}
          <input
            {...props}
            ref={ref}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn(
              "flex h-10 w-full items-center text-right pl-9 rounded-md border border-border bg-background text-base pr-1 placeholder:text-zinc-400 placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-none disabled:cursor-not-allowed disabled:opacity-50",
              `${icon ? "" : "pl-2"}`,
              alignRight ? "text-right" : ""
            )}
          />
          {/* Ícone */}
          {icon && (
            <div className="absolute inset-y-0 left-2 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer">
              {icon}
            </div>
          )}
        </div>
        {/* Mensagem de erro */}
        {errorMessage && <span className="text-destructive text-xs">{errorMessage}</span>}
      </div>
    );
  }
);

InputFieldCurrency.displayName = "InputFieldCurrency";

export { InputFieldCurrency };
