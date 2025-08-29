// src/api/client.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiRequest(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<{ ok: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        error: data?.message || `Request failed with status ${res.status}`,
      };
    }

    return { ok: true, data };
  } catch (err: any) {
    return { ok: false, error: err.message || "Network error" };
  }
}
