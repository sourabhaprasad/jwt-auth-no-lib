// /components/ui/Alert.tsx
import React from "react";
import { cn } from "@/app/lib/utils";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "info";
}

const Alert: React.FC<AlertProps> = ({ message, type = "info" }) => {
  const colors = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
  };

  return (
    <div className={cn("p-3 rounded-md shadow-md", colors[type])}>
      {message}
    </div>
  );
};

export default Alert;
