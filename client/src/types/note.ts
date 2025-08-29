export interface Note {
  _id: string;
  title: string;
  content: string;
  folder?: string;
  color?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}
