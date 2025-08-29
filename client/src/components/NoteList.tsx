"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface NoteListProps {
  theme?: "light" | "dark";
}

const sampleNotes = [
  { id: "n1", title: "Quarterly Planning", preview: "Outline objectives, key results, and timelines...", updated: "2h ago" },
  { id: "n2", title: "Design System Tasks", preview: "Audit components and unify tokens across app...", updated: "Yesterday" },
  { id: "n3", title: "Travel Checklist", preview: "Passport, charger, adapters, SIM card...", updated: "Aug 22" },
  { id: "n4", title: "AI Notes Ideas", preview: "Summaries, auto tags, semantic search...", updated: "Aug 18" },
];

export function NoteList({ theme = "dark" }: NoteListProps) {
  const bgColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const mutedColor = theme === "dark" ? "text-muted-foreground" : "text-gray-500";

  return (
    <div className={`flex h-full flex-col ${bgColor}`}>
      <div className="px-4 pt-4">
        <h3 className={`text-xs font-semibold ${textColor}`}>Notes</h3>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-4 pt-2">
        {sampleNotes.map((n) => (
          <div key={n.id} className="group rounded-xl relative">
            {/* Gradient border on hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="h-full w-full rounded-xl p-[1px] bg-gradient-to-r from-purple-500 to-indigo-500">
                <div className={`${bgColor} rounded-xl h-full w-full`}></div>
              </div>
            </div>

            {/* Card */}
            <Card className={`rounded-xl ${bgColor} border border-transparent transition-colors hover:border-white/40 relative z-10`}>
              <CardHeader className="pb-1">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs font-medium ${textColor}`}>{n.title}</h4>
                  <span className={`text-[10px] ${mutedColor}`}>{n.updated}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-2 pt-0">
                <p className={`line-clamp-2 text-xs ${mutedColor}`}>{n.preview}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
