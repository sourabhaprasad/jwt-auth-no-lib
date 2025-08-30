"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout as logoutApi } from "@/api/auth";
import { cn } from "@/app/lib/utils";
import {
  Home,
  FileText,
  LogOut,
  Folder,
  Briefcase,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

const navItems = [{ name: "All Notes", folder: "All Notes", icon: FileText }];

const folders = [
  { name: "Work", icon: Briefcase },
  { name: "Personal", icon: Home },
  { name: "Idea", icon: Lightbulb },
  { name: "Projects", icon: Folder },
];

export default function Sidebar() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const { currentFolder, setCurrentFolder } = useDashboard();

  const handleLogout = async () => {
    try {
      await logoutApi();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <aside
      className={cn(
        "h-screen p-2 flex flex-col justify-between transition-all duration-300 bg-black",
        collapsed ? "w-20" : "w-56"
      )}
    >
      <div className="space-y-2">
        {/* Collapse Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-full bg-gray-800 text-white hover:bg-gray-700"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Title */}
        {!collapsed && (
          <h3 className="text-lg font-semibold text-white">Notes</h3>
        )}

        {/* Main Navigation */}
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setCurrentFolder(item.folder)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors",
                currentFolder === item.folder
                  ? "bg-purple-600 text-white font-semibold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <span className="p-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <item.icon className="w-4 h-4" />
              </span>
              {!collapsed && (
                <span className="text-xs font-medium">{item.name}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Folders Section */}
        {!collapsed && (
          <div>
            <p className="uppercase text-[12px] font-semibold mb-1 text-gray-400">
              Notebooks
            </p>
            <nav className="flex flex-col space-y-1">
              {folders.map((folder) => (
                <button
                  key={folder.name}
                  onClick={() => setCurrentFolder(folder.name)}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors",
                    currentFolder === folder.name
                      ? "bg-purple-600/40 text-white font-semibold"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span className="p-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <folder.icon className="w-4 h-4" />
                  </span>
                  {!collapsed && (
                    <span className="text-xs font-medium">{folder.name}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors text-gray-300 hover:bg-white/10 hover:text-white"
      >
        <span className="p-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <LogOut className="w-4 h-4" />
        </span>
        {!collapsed && <span className="text-xs font-medium">Logout</span>}
      </button>
    </aside>
  );
}
