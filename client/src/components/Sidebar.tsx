"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import {
  Home,
  FileText,
  LogOut,
  Folder,
  Briefcase,
  Archive,
  Trash2,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  theme?: "light" | "dark";
}

const navItems = [
  { name: "All Notes", href: "/dashboard", icon: FileText },
  { name: "Profile", href: "/profile", icon: Home },
];

const folders = [
  { name: "Work", href: "/folder/work", icon: Briefcase },
  { name: "Personal", href: "/folder/personal", icon: Home },
  { name: "Ideas", href: "/folder/ideas", icon: Lightbulb },
  { name: "Projects", href: "/folder/projects", icon: Folder },
  { name: "Archive", href: "/folder/archive", icon: Archive },
  { name: "Trash", href: "/folder/trash", icon: Trash2 },
];

export default function Sidebar({ theme = "dark" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const bgColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-800";
  const hoverBg = theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-200";
  const hoverText = theme === "dark" ? "hover:text-white" : "hover:text-gray-900";

  return (
    <aside
      className={cn(
        `h-screen p-2 flex flex-col justify-between transition-all duration-300 ${bgColor}`,
        collapsed ? "w-20" : "w-56"
      )}
    >
      <div className="space-y-2">
        {/* Collapse Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn("p-1 rounded-full", theme === "dark" ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300")}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Title */}
        {!collapsed && (
          <h3 className={cn("text-lg font-semibold", theme === "dark" ? "text-white" : "text-gray-900")}>Notes</h3>
        )}

        {/* Main Navigation */}
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                `flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${textColor} ${hoverBg} ${hoverText}`
              )}
            >
              <span className="p-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <item.icon className="w-4 h-4" />
              </span>
              {!collapsed && <span className="text-xs font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Folders Section */}
        {!collapsed && (
          <div>
            <p className={cn("uppercase text-[12px] font-semibold mb-1", theme === "dark" ? "text-gray-400" : "text-gray-500")}>
              Notebooks
            </p>
            <nav className="flex flex-col space-y-1">
              {folders.map((folder) => (
                <Link
                  key={folder.name}
                  href={folder.href}
                  className={cn(
                    `flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${textColor} ${hoverBg} ${hoverText}`
                  )}
                >
                  <span className="p-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <folder.icon className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-medium">{folder.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors",
          textColor,
          hoverBg,
          hoverText
        )}
      >
        <span className="p-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <LogOut className="w-4 h-4" />
        </span>
        {!collapsed && <span className="text-xs font-medium">Logout</span>}
      </button>
    </aside>
  );
}
