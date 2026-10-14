import Image from "next/image";

export interface Race {
  id: string;
  name: string;
  tagline: string;
  image: string;
  availability: string;
  rarity: string;
  overview: string;
  appearance: string;
  culture: string;
  perception: string;
  playingThisRace: string;
  closingQuote: string;
  specialTraits?: RaceTrait[];
}
export interface RaceTrait {
  id: string;
  name: string;
  description: string;
  examples?: string[];
  mechanicalEffect?: string;
  status: string;
}
interface RaceCardProps {
  race: Race;
}

export default function RaceCard({ race }: RaceCardProps) {
  const sections = [
    { title: "Overview", content: race.overview },
    { title: "Appearance", content: race.appearance },
    { title: "Culture", content: race.culture },
    { title: "How Others See Them", content: race.perception },
    { title: "Playing This Race", content: race.playingThisRace },
  ];

  return (
    <article className="overflow-hidden rounded-xl border border-stone-700 bg-stone-900 text-stone-100">
      <div className="relative aspect-[16/9]">
        <Image
          src={race.image}
          alt={`${race.name} of Athas`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      <div className="space-y-6 p-6">
        <div>
          <div className="mb-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-amber-900 px-3 py-1 text-amber-100">
              {race.availability}
            </span>
            <span className="rounded-full bg-stone-700 px-3 py-1">
              {race.rarity}
            </span>
          </div>

          <h3 className="text-3xl font-bold">{race.name}</h3>
          <p className="mt-1 italic text-amber-400">{race.tagline}</p>
        </div>

        {sections.map((section) => (
          <section key={section.title}>
            <h4 className="mb-2 text-lg font-semibold text-amber-400">
              {section.title}
            </h4>
            <p className="leading-relaxed text-stone-300">{section.content}</p>
          </section>
        ))}

        {race.specialTraits && race.specialTraits.length > 0 && (
          <section className="space-y-5 border-t border-stone-700 pt-6">
            <h4 className="text-xl font-semibold text-amber-400">
              Special Racial Traits
            </h4>

            {race.specialTraits.map((trait) => (
              <div
                key={trait.id}
                className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-5"
              >
                <h5 className="mb-2 font-semibold text-amber-300">
                  {trait.name}
                </h5>

                <p className="leading-relaxed text-stone-300">
                  {trait.description}
                </p>

                {trait.examples && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-stone-400">
                    {trait.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                )}

                {trait.mechanicalEffect &&
                  trait.status === "pending-mechanics" && (
                    <p className="mt-4 text-xs italic text-stone-500">
                      Exact mechanics will be finalized before character
                      creation.
                    </p>
                  )}
              </div>
            ))}
          </section>
        )}

        <blockquote className="border-l-2 border-amber-600 pl-4 italic text-stone-300">
          {race.closingQuote}
        </blockquote>
      </div>
    </article>
  );
}
