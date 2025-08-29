"use client";

import { Plus } from "lucide-react";
import GradientButton from "./GradientButton";

interface TopBarProps {
  onNewNote: () => void;
}

export default function TopBar({ onNewNote }: TopBarProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/20">
      <h1 className="text-xl font-bold text-white">My Notes</h1>
      <GradientButton onClick={onNewNote} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        New Note
      </GradientButton>
    </div>
  );
}
