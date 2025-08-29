// src/api/client.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

interface RequestBody {
  [key: string]: unknown;
}

export async function apiRequest(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: RequestBody
): Promise<ApiResponse> {
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
        error: data?.error || `Request failed with status ${res.status}`,
      };
    }

    return { ok: true, data };
  } catch (err: unknown) {
    const error = err as Error;
    return { ok: false, error: error.message || "Network error" };
  }
}
