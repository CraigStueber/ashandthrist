"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function PlayerLogin() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessCode: password }),
      });

      if (!response.ok) {
        setError(
          response.status === 401
            ? "The chest clicks its teeth. Apparently, those weren't the words."
            : "The chest growls. Something went wrong. Try again.",
        );
        return;
      }

      router.refresh();
    } catch {
      setError("The chest refuses to cooperate. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label htmlFor="mimic-password" className="sr-only">
        Secret access code
      </label>

      <div className="flex items-center gap-4 rounded-lg border border-[#A46A35] bg-[#0D0907] px-5 py-4 focus-within:border-[#E0A45E]">
        <span aria-hidden="true" className="text-xl text-[#CBA879]">
          ⚿
        </span>

        <input
          id="mimic-password"
          type="password"
          autoComplete="off"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Whisper the secret words..."
          required
          className="w-full min-w-0 bg-transparent text-base text-[#F3DFC1] outline-none placeholder:text-[#96795E]"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !password.trim()}
        className="w-full rounded-lg bg-gradient-to-r from-[#BD7836] via-[#E0A15A] to-[#BD7836] px-6 py-4 font-serif text-base font-bold uppercase tracking-[0.2em] text-[#170D07] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "The Chest Is Thinking..." : "Trust the Chest"}
      </button>

      {error && (
        <p role="alert" className="text-center text-sm text-[#E9A17D]">
          {error}
        </p>
      )}
    </form>
  );
}
