// components/BookUploadForm/ProgressBar.tsx
"use client";

import { cn } from "@/lib/utils";

type Props = {
  currentStep: number;
  steps: string[];
};

export default function ProgressBar({ currentStep, steps }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex-1">
          <div
            className={cn(
              "h-2 rounded-full",
              index <= currentStep - 1 ? "bg-indigo-600" : "bg-gray-200"
            )}
          />
          <p className="text-xs text-center mt-1 text-gray-600">{step}</p>
        </div>
      ))}
    </div>
  );
}
