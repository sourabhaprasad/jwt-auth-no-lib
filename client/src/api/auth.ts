import { apiRequest } from "./client";
import toast from "react-hot-toast";

export const signup = async (username: string, password: string) => {
  if (!username.trim() || !password.trim()) {
    toast.error("Username and password are required");
    return null;
  }

  try {
    const res = await apiRequest("/auth/signup", "POST", {
      username,
      password,
    });

    if (res?.ok) {
      toast.success("Signup successful!");
      return res;
    } else {
      // Handle specific backend error messages
      const errorMsg = res?.error || "Signup failed";

      if (errorMsg.toLowerCase().includes("username taken")) {
        toast.error("User already exists. Please login instead.");
      } else {
        toast.error(errorMsg);
      }

      return null;
    }
  } catch (err: any) {
    console.error("Signup error:", err);
    toast.error(err?.message || "Network error during signup");
    return null;
  }
};

export const login = async (username: string, password: string) => {
  if (!username.trim() || !password.trim()) {
    toast.error("Username and password are required");
    return null;
  }

  try {
    const res = await apiRequest("/auth/login", "POST", { username, password });
    if (res?.ok) {
      toast.success("Logged in successfully!");
      return res;
    } else {
      const errorMsg = res?.error || "Login failed";
      toast.error(errorMsg);
      return null;
    }
  } catch (err: any) {
    console.error("Login error:", err);
    toast.error(err?.message || "Network error during login");
    return null;
  }
};

export const logout = async () => {
  try {
    const res = await apiRequest("/auth/logout", "POST");
    if (res?.ok) {
      toast.success("Logged out successfully");
      return res;
    } else {
      const errorMsg = res?.error || "Logout failed";
      toast.error(errorMsg);
      return null;
    }
  } catch (err: any) {
    console.error("Logout error:", err);
    toast.error(err?.message || "Network error during logout");
    return null;
  }
};
