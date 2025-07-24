"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, indicatorClassName, ...props }, ref) => {
    const percentage = Math.min(Math.max(value, 0), max);
    const progressStyle = { width: `${percentage}%` };

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-gray-200",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full w-0 rounded-full bg-dark-blue-lighter transition-all duration-300",
            indicatorClassName
          )}
          style={progressStyle}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };