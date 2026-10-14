import racesData from "@/data/races.json";
import RaceCard, { type Race } from "./RaceCard";

export default function RacesSection() {
  const races = racesData.races as Race[];

  return (
    <section id="races" className="space-y-10">
      <header className="max-w-3xl">
        <h2 className="text-4xl font-bold">The Peoples of Athas</h2>
        <p className="mt-4 text-stone-400">
          Athas is home to peoples shaped by hardship, ancient history, and the
          struggle to survive. Each brings a different perspective to a world
          where freedom is never guaranteed.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {races.map((race) => (
          <RaceCard key={race.id} race={race} />
        ))}
      </div>
    </section>
  );
}
