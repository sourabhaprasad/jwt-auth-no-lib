// /components/ui/InputField.tsx
import React from "react";
import { cn } from "@/app/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-gray-300 mb-1">{label}</label>}
      <input
        className={cn(
          "bg-black border border-white/10 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-red-400 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default InputField;
