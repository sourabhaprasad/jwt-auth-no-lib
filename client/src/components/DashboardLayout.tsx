"use client";

import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  currentFolder: string;
  setCurrentFolder: (folder: string) => void;
  onNewNote: () => void;
  onSearch: (query: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentFolder,
  setCurrentFolder,
  onNewNote,
  onSearch,
}) => {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar
        currentFolder={currentFolder}
        setCurrentFolder={setCurrentFolder}
      />

      <div className="flex-1 flex flex-col">
        <TopBar onNewNote={onNewNote} />

        <main className="flex-1 flex overflow-hidden p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
