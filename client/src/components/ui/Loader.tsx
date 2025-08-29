// /components/ui/Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-t-indigo-500 border-gray-700 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
