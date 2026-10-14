"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { varek } from "@/server/ai/varek";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function NpcChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: varek.greeting },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, loading]);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text || loading) return;

    const updated: Message[] = [...messages, { role: "user", content: text }];

    setMessages(updated);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.slice(-12),
        }),
      });

      const result = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !result.reply) {
        throw new Error(result.error || "Varek did not respond.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: result.reply! },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]">
      {/* Varek's character panel */}
      <aside className="relative overflow-hidden rounded-xl border border-[#493727] bg-[#211813] lg:min-h-[680px]">
        <div className="relative h-64 sm:h-80 lg:absolute lg:inset-0 lg:h-full">
          <Image
            src="/images/Varek.jpg"
            alt="Varek, the Broken Chain, a scarred mul survivor of Athas"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 35vw"
            className="object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#100E0C] via-[#100E0C]/20 to-transparent" />
        </div>

        <div className="relative flex flex-col justify-end px-6 py-6 lg:absolute lg:inset-0 lg:px-8 lg:py-9">
          <div className="hidden lg:block lg:flex-1" />

          <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#D49B62]">
            A Voice from the Wastes
          </p>

          <h1 className="font-serif text-5xl font-semibold tracking-wide text-[#F0D8B8] lg:text-6xl">
            VAREK
          </h1>

          <p className="mt-2 text-xl text-[#D49B62]">The Broken Chain</p>

          <div className="mt-5 h-px w-16 bg-[#A36C3D]" />

          <p className="mt-5 text-sm leading-relaxed text-[#C6B5A1]">
            Mul · Former gladiator · Caravan guard
          </p>

          <p className="mt-3 max-w-sm text-sm italic leading-relaxed text-[#B8A18A]">
            &ldquo;Knowing a thing and surviving it are two different
            matters.&rdquo;
          </p>
        </div>
      </aside>

      {/* Conversation */}
      <section className="flex h-[70vh] min-h-[480px] flex-col overflow-hidden rounded-xl border border-[#493727] bg-[#1D1712] lg:h-[min(80vh,850px)] lg:min-h-[680px]">
        <div className="flex items-center gap-4 border-b border-[#493727] bg-[#241B15] px-5 py-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#795238]">
            <Image
              src="/images/Varek.jpg"
              alt=""
              fill
              sizes="48px"
              className="object-cover object-top"
            />
          </div>

          <div className="min-w-0">
            <p className="font-serif text-lg text-[#E6D3B5]">
              Speak with Varek
            </p>
            <p className="text-xs text-[#A99883]">
              A traveler with stories to tell
            </p>
          </div>

          <div className="ml-auto hidden items-center gap-2 text-xs text-[#A99883] sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#B88A50]" />
            By the fire
          </div>
        </div>

        <div
          className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-7"
          aria-live="polite"
          aria-relevant="additions"
        >
          <div className="mb-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#92735A]">
              The conversation begins
            </p>
            <div className="mx-auto mt-3 h-px w-16 bg-[#493727]" />
          </div>

          {messages.map((message, index) => {
            const isVarek = message.role === "assistant";

            return (
              <div
                key={index}
                className={`flex ${isVarek ? "justify-start" : "justify-end"}`}
              >
                <div className="max-w-[92%] sm:max-w-[85%]">
                  <p
                    className={`mb-2 text-[10px] uppercase tracking-[0.2em] text-[#C58D55] ${
                      isVarek ? "text-left" : "text-right"
                    }`}
                  >
                    {isVarek ? "Varek" : "You"}
                  </p>

                  <div
                    className={`whitespace-pre-wrap rounded-xl px-5 py-4 text-sm leading-7 sm:text-base ${
                      isVarek
                        ? "rounded-tl-sm border border-[#493727] bg-[#30241B] text-[#E6D3B5]"
                        : "rounded-tr-sm border border-[#795238] bg-[#493020] text-[#F0D8B8]"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-xl border border-[#493727] bg-[#30241B] px-5 py-4">
                <p className="animate-pulse text-sm italic text-[#B8A18A]">
                  Varek considers his words...
                </p>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="border-t border-[#493727] bg-[#241B15] p-4 sm:p-5">
          {error && (
            <p role="alert" className="mb-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <form onSubmit={sendMessage}>
            <div className="flex items-center gap-3 rounded-lg border border-[#614530] bg-[#100E0C] p-2 transition-colors focus-within:border-[#D49B62]">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1000}
                disabled={loading}
                placeholder="Ask Varek something..."
                aria-label="Message Varek"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[#E6D3B5] outline-none placeholder:text-[#82705F] disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 rounded-md bg-[#A66D3D] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#100E0C] transition hover:bg-[#D49B62] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>

          <p className="mt-3 text-center text-[11px] text-[#82705F]">
            The wastes hold many stories. Not all of them are true.
          </p>
        </div>
      </section>
    </div>
  );
}
