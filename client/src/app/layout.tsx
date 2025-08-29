import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecureNotes - JWT Auth Note-Taking App",
  description:
    "SecureNotes is a note-taking application with JWT-based authentication, role-based access, and no external auth libraries.",
  keywords: [
    "notes",
    "JWT",
    "authentication",
    "role-based access",
    "secure notes",
    "note-taking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
