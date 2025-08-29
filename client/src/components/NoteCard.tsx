// components/NoteCard.tsx
import { cn } from "@/app/lib/utils";

interface NoteCardProps {
  title: string;
  content: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function NoteCard({
  title,
  content,
  onEdit,
  onDelete,
}: NoteCardProps) {
  return (
    <div className="bg-black p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-border">
      <h3 className="text-foreground font-semibold text-lg">{title}</h3>
      <p className="text-muted-foreground mt-2">{content.slice(0, 100)}...</p>

      <div className="mt-4 flex gap-2">
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-accent text-accent-foreground hover:opacity-90 rounded-md text-sm transition"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-destructive text-destructive-foreground hover:opacity-90 rounded-md text-sm transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
