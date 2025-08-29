"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GradientButton from "@/components/GradientButton";
import InputField from "@/components/ui/InputField";
import { signup, login } from "@/api/auth";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const signupRes = await signup(form.username, form.password);
    if (!signupRes) return; // signup failed, toast already shown

    // Auto-login after signup
    const loginRes = await login(form.username, form.password);
    if (loginRes) {
      setForm({ username: "", password: "" });
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-black p-6 shadow-lg border border-white/20"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Register
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
          Register
        </GradientButton>

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
