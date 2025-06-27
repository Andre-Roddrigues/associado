import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorMessage?: string;
  }

const ContactInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({label,errorMessage, className, type, ...props }, ref) => {
    return (
        <div className={cn("flex flex-col h-20 text-muted-foreground w-full ", className)}>
          <Label className="text-sm mb-1 font-light">{label}</Label>
          <div className="relative ">
              <input
                type={type}
                className={cn(
                  "flex h-10 w-full items-center px-3 rounded-md border border-border bg-background text-sm  placeholder:text-zinc-400 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-none disabled:cursor-not-allowed disabled:opacity-50",
                 
                )}
                ref={ref}
                {...props}
              />
        </div>
        <span className="text-destructive  text-xs">{errorMessage}</span>
        </div>
    )
  }
)
ContactInput.displayName = "ContactInput"

export { ContactInput }
