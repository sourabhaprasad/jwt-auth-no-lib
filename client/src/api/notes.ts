// src/api/notes.ts
import axios from "axios";

const API_URL = "http://localhost:4000";

export const createNote = async (note: {
  title: string;
  content: string;
  folder?: string;
  color?: string;
  tags?: string[];
}) => {
  const res = await axios.post(`${API_URL}/notes`, note, {
    withCredentials: true,
  });
  return res.data;
};

export const getNotes = async () => {
  const res = await axios.get(`${API_URL}/notes`, { withCredentials: true });
  return res.data;
};

export const getNoteById = async (id: string) => {
  const res = await axios.get(`${API_URL}/notes/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const updateNote = async (id: string, note: any) => {
  const res = await axios.put(`${API_URL}/notes/${id}`, note, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await axios.delete(`${API_URL}/notes/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const archiveNote = async (id: string) => {
  const res = await axios.put(
    `${API_URL}/notes/${id}/archive`,
    {},
    { withCredentials: true }
  );
  return res.data;
};
