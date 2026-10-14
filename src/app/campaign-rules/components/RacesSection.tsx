"use client";

import { useState } from "react";
import racesData from "@/data/races.json";
import RaceCard, { type Race } from "./RaceCard";

export default function RacesSection() {
  const races = racesData.races as Race[];

  const [selectedRace, setSelectedRace] = useState<string>(races[0]?.id ?? "");

  const activeRace = races.find((race) => race.id === selectedRace);

  return (
    <section id="races" className="space-y-10">
      {/* Section heading */}
      <header className="max-w-3xl">
        <h2 className="font-serif text-4xl font-bold">The Peoples of Athas</h2>

        <p className="mt-4 leading-relaxed text-stone-400">
          Athas is home to peoples shaped by hardship, ancient history, and the
          struggle to survive. Each brings a different perspective to a world
          where freedom is never guaranteed.
        </p>

        <p className="mt-3 text-sm text-amber-500">
          Select a race to learn more.
        </p>
      </header>

      {/* Race selection buttons */}
      <nav aria-label="Playable races" className="flex flex-wrap gap-3">
        {races.map((race) => {
          const isActive = selectedRace === race.id;

          return (
            <button
              key={race.id}
              type="button"
              onClick={() => setSelectedRace(race.id)}
              aria-pressed={isActive}
              className={`
                rounded-lg border px-5 py-3
                text-sm font-semibold
                transition-all duration-200
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-amber-500
                ${
                  isActive
                    ? "border-amber-500 bg-amber-950/50 text-amber-300"
                    : "border-stone-700 bg-stone-900 text-stone-400 hover:border-amber-700 hover:text-amber-300"
                }
              `}
            >
              {race.name}
            </button>
          );
        })}
      </nav>

      {/* Display selected race only */}
      {activeRace && (
        <div key={activeRace.id} className="max-w-5xl">
          <RaceCard race={activeRace} />
        </div>
      )}
    </section>
  );
}
