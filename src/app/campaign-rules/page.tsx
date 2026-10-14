import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import CampaignRulesContent from "./components/CampaignRulesContent";

export const metadata: Metadata = {
  title: "Races, Classes & Campaign Rules | Ash & Thirst",
  description:
    "Explore the playable races, classes, magic, weapons, armor, and house rules for Ash & Thirst.",
};

export default function CampaignRulesPage() {
  return (
    <main className="min-h-screen bg-[#120f0c] text-stone-100">
      <header className="relative overflow-hidden border-b border-amber-900/30">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/25 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-12 md:pb-24 md:pt-20">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-300"
          >
            <span aria-hidden="true">←</span>
            Back to Athas
          </Link>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
            A Player&apos;s Guide to Athas
          </p>

          <h1 className="max-w-4xl font-serif text-5xl font-bold tracking-tight md:text-7xl">
            Races, Classes
            <span className="block text-amber-500">&amp; Campaign Rules</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-400">
            Athas is not another Forgotten Realms. Some peoples are gone
            forever. Magic carries consequences. Metal is precious. Psionics are
            commonplace. And survival is never guaranteed.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <Suspense fallback={<p className="text-stone-400">Loading rules...</p>}>
          <CampaignRulesContent />
        </Suspense>
      </div>

      <footer className="border-t border-stone-800/70">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-sm text-stone-500">
            Ash &amp; Thirst campaign rules. Last updated October 2026.
          </p>
        </div>
      </footer>
    </main>
  );
}
