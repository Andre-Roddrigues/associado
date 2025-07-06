"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useEffect } from "react";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
        xl: "h-5",
      },
      variant: {
        default: "bg-gray-200",
        primary: "bg-primary/20",
        destructive: "bg-destructive/20",
        success: "bg-emerald-500/20",
        premium: "bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full rounded-full transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-gray-900",
        primary: "bg-primary",
        destructive: "bg-destructive",
        success: "bg-emerald-500",
        premium: "bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500",
      },
      striped: {
        true: "bg-striped",
        false: "",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      striped: false,
      animated: false,
    },
  }
);

interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
  valuePosition?: "inside" | "outside";
  label?: string;
  indicatorClassName?: string;
}

export function Progress({
  className,
  indicatorClassName,
  value = 0,
  max = 100,
  size,
  variant,
  striped,
  animated,
  showValue = false,
  valuePosition = "outside",
  label,
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100));
  const spring = useSpring(0, { stiffness: 100, damping: 20 });
  const width = useMotionTemplate`${spring}%`;

  useEffect(() => {
    spring.set(percentage);
  }, [percentage, spring]);

  const renderValue = () => (
    <span
      className={cn(
        "text-xs font-medium",
        variant === "premium" && "bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500"
      )}
    >
      {value}/{max}
    </span>
  );

  return (
    <div className="w-full space-y-1">
      {(label || (showValue && valuePosition === "outside")) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showValue && valuePosition === "outside" && renderValue()}
        </div>
      )}

      <div
        className={cn(progressVariants({ size, variant, className }))}
        {...props}
      >
        <motion.div
          className={cn(
            progressIndicatorVariants({ variant, striped, animated, indicatorClassName }),
            "relative"
          )}
          style={{ width }}
        >
          {showValue && valuePosition === "inside" && (
            <div className="absolute inset-0 flex items-center justify-center">
              {renderValue()}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// CSS for striped effect (add to your global CSS)
/*
.bg-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}
*/