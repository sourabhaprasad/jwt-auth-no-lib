"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import GradientButton from "./GradientButton";

interface TopBarProps {
  onNewNote: () => void;
}

export default function TopBar({ onNewNote }: TopBarProps) {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-black transition-colors">
      <div className="relative w-[30%]"></div>

      <GradientButton
        size="sm"
        onClick={onNewNote}
        className="flex items-center gap-1"
      >
        <Plus className="w-4 h-4" /> New Note
      </GradientButton>
    </header>
  );
}
