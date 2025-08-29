"use client";
import { useState } from "react";
import Link from "next/link";
import GradientButton from "@/components/GradientButton";
import InputField from "@/components/ui/InputField";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Registration failed");
      alert("Registered successfully!");
      setForm({ name: "", email: "", password: "" });
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-black p-6 shadow-lg border border-white/20"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Register</h2>
        <InputField label="Name" name="name" value={form.name} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <GradientButton type="submit" className="w-full mt-4">Register</GradientButton>

        {/* Already registered prompt */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Already registered?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
