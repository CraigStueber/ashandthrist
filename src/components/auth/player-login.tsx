"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlayerLogin() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setError(result.error || "Access denied.");
        return;
      }

      setCode("");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div>
        <label
          htmlFor="access-code"
          className="block text-xs uppercase tracking-[0.2em] text-[#D49B62]"
        >
          Secret Password
        </label>

        <input
          id="access-code"
          type="password"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          autoComplete="off"
          required
          maxLength={200}
          className="mt-3 w-full rounded border border-[#614530] bg-[#100E0C] px-4 py-4 text-[#E6D3B5] outline-none focus:border-[#D49B62]"
          placeholder="The chest is listening..."
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-[#D49B62] px-6 py-4 text-xs uppercase tracking-[0.2em] text-[#D49B62] transition hover:bg-[#D49B62] hover:text-[#100E0C] disabled:opacity-50"
      >
        {loading ? "Inspecting the Chest..." : "Open the Chest"}
      </button>
    </form>
  );
}
