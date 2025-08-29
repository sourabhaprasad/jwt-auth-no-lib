// components/NoteCard.tsx
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

interface NoteCardProps {
  title: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function NoteCard({ title, content, onEdit, onDelete }: NoteCardProps) {
  return (
    <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
      <div onClick={onEdit}>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{content}</p>
      </div>
      <button
        onClick={onDelete}
        className="mt-2 text-red-500 hover:text-red-700 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </Card>
  );
}
