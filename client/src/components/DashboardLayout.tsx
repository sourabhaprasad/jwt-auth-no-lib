"use client";

import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 flex overflow-hidden p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
