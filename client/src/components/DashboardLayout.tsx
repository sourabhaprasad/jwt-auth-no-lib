"use client";

import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { NoteList } from "./NoteList";
import { NoteEditor } from "./NoteEditor";

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-black text-foreground">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 flex overflow-hidden p-6">
          {/* Notes List */}
          <div className="w-80 flex-shrink-0">
            <NoteList />
          </div>

          {/* Editor */}
          <div className="flex-1 ml-6">
            <NoteEditor />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
