"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import GradientButton from "@/components/GradientButton";
import InputField from "@/components/ui/InputField";
import { login } from "@/api/auth";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form.username, form.password);
      if (res && res.ok) {
        toast.success("Logged in successfully!");
        router.push("/dashboard"); // redirect to dashboard
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-black p-6 shadow-lg border border-white/20"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Login
        </h2>
        <InputField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <GradientButton type="submit" className="w-full mt-4">
          Login
        </GradientButton>
        <p className="mt-4 text-center text-sm text-gray-400">
          Not registered?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
