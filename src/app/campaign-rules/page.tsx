import type { Metadata } from "next";
import RacesSection from "./components/RacesSection";

export const metadata: Metadata = {
  title: "Races, Classes & Campaign Rules | Ash & Thirst",
  description:
    "Discover the playable races, classes, magic, equipment, and house rules for Ash & Thirst, a Dark Sun campaign set on Athas.",
};

export default function CampaignRulesPage() {
  return (
    <main className="min-h-screen bg-[#120f0c] text-stone-100">
      {/* Page introduction */}
      <header className="relative overflow-hidden border-b border-amber-900/30">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/25 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 md:pb-24 md:pt-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
            A Player's Guide to Athas
          </p>

          <h1 className="max-w-4xl font-serif text-5xl font-bold tracking-tight md:text-7xl">
            Races, Classes
            <span className="block text-amber-500">& Campaign Rules</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-400">
            Athas is not another Forgotten Realms. Some peoples are gone
            forever. Magic carries consequences. Metal is precious. Psionics are
            commonplace. And survival is never guaranteed.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest">
            <span className="rounded-full border border-amber-800/60 bg-amber-950/40 px-4 py-2 text-amber-400">
              Campaign Rules
            </span>
            <span className="text-stone-500">Last Updated: October 2026</span>
          </div>
        </div>
      </header>

      {/* Campaign rules content */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <RacesSection />

        {/*
          Additional sections will go here as we build them:

          <ClassesSection />
          <MagicSection />
          <PsionicsSection />
          <EquipmentSection />
          <CharacterCreationSection />
          <CampaignRulesSection />
        */}
      </div>

      {/* Page footer */}
      <footer className="border-t border-stone-800/70">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="max-w-3xl text-sm leading-relaxed text-stone-500">
            These rules are specific to the Ash & Thirst campaign and may evolve
            as official Dark Sun materials become available. Campaign-specific
            house rules take precedence where noted.
          </p>
        </div>
      </footer>
    </main>
  );
}
