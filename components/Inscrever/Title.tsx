import React from "react";
import { cn } from "@/lib/utils"; 

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <h1 className={cn("text-2xl md:text-3xl font-bold text-muted-foreground", className)}>
      {children}
    </h1>
  );
};

export default Title;