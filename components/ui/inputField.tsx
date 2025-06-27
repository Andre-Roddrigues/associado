import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    label?: string;
    errorMessage?: any;
    alignRigth?: boolean;
  }

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({icon,label,errorMessage,alignRigth, className, type, ...props }, ref) => {
    return (
        <div className={cn("flex flex-col h-20 text-muted-foreground w-full ", className)}>
          <Label className="text-sm mb-1 font-light">{label}</Label>
          <div className="relative ">
              <input
                type={type}
                className={cn(
                  "flex h-10 w-full items-center pl-9 rounded-md border border-border bg-background text-base  placeholder:text-zinc-400 placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-none disabled:cursor-not-allowed disabled:opacity- disabled:border-none disabled:bg-transparent  disabled:text-zinc-600 disabled:tracking-wide", `${icon ? " " : "pl-2  disabled:pl-1 disabled:-mt-1"}`, `${alignRigth ? "text-right" : ""}`
                 
                )}
                ref={ref}
                {...props}
              />
              <div className="absolute inset-y-0 -mb- left-2 top-1/2 transform -translate-y-1/2  text-xl cursor-pointer">
                {icon}
              </div>
        </div>
        <span className="text-destructive  text-xs">{errorMessage}</span>
        </div>
    )
  }
)
InputField.displayName = "InputField"

export { InputField }
