"use client";

import { Plus, Search } from "lucide-react";

export default function TopBar() {
  return (
    <header className="w-full h-16 flex items-center justify-end px-6 bg-black transition-colors">
      <div className="flex items-center gap-2 w-[30%]">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-9 pr-3 py-1.5 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
          />
        </div>

        {/* New Note */}
        <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Note
        </button>
      </div>
    </header>
  );
}
