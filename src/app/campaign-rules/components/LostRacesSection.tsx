const extinctRaces = [
  "Orcs",
  "Goblins",
  "Gnomes",
  "Kobolds",
  "Ogres",
  "Trolls",
  "Pixies",
  "Wemics",
];

const unavailableRaces = [
  "Dragonborn",
  "Tieflings",
  "Aasimar",
  "Goliaths",
  "Tabaxi",
  "Firbolgs",
  "Kenku",
  "Changelings",
  "Warforged",
];

export default function LostRacesSection() {
  return (
    <section
      id="lost-peoples"
      className="space-y-10 border-t border-stone-800 pt-16"
    >
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
          The Cleansing Wars
        </p>

        <h2 className="font-serif text-4xl font-bold md:text-5xl">
          The Peoples Who Are No More
        </h2>

        <p className="mt-6 leading-relaxed text-stone-400">
          Long before the present age, terrible wars swept across Athas. Entire
          civilizations were targeted for annihilation. Great armies marched,
          cities burned, and powerful magic consumed the life of the land.
        </p>

        <p className="mt-4 leading-relaxed text-stone-400">
          Some peoples survived. Others disappeared forever.
        </p>
      </div>

      <div>
        <h3 className="mb-5 text-xl font-semibold text-stone-200">
          Lost to the Cleansing Wars
        </h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {extinctRaces.map((race) => (
            <div
              key={race}
              className="rounded-lg border border-red-950/70 bg-red-950/10 p-4 text-center"
            >
              <span className="text-lg font-semibold text-stone-300">
                {race}
              </span>

              <p className="mt-1 text-xs uppercase tracking-widest text-red-500/80">
                Extinct
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 font-serif text-lg italic text-stone-500">
          Their ruins remain. Their names survive in forgotten stories. But
          their civilizations will never rise again.
        </p>
      </div>

      <div className="border-t border-stone-800 pt-10">
        <h3 className="text-2xl font-semibold text-amber-500">
          What About Other D&D Races?
        </h3>

        <p className="mt-4 max-w-3xl leading-relaxed text-stone-400">
          Athas is not a world where every race found in traditional Dungeons
          &amp; Dragons exists. Some were exterminated thousands of years ago.
          Others have no established place in the world as it is presented in
          this campaign.
        </p>

        <p className="mt-4 max-w-3xl leading-relaxed text-stone-400">
          The following familiar D&amp;D options are not available for player
          character creation in Ash &amp; Thirst:
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {unavailableRaces.map((race) => (
            <span
              key={race}
              className="rounded-full border border-stone-700 bg-stone-900 px-4 py-2 text-sm text-stone-400"
            >
              {race}
            </span>
          ))}
        </div>

        <div className="mt-8 rounded-lg border-l-2 border-amber-700 bg-amber-950/10 p-5">
          <h4 className="font-semibold text-amber-400">
            Character Creation Restriction
          </h4>

          <p className="mt-2 leading-relaxed text-stone-400">
            Only the eight races listed in The Peoples of Athas section are
            available as player characters. Additional species, including those
            that may exist elsewhere on Athas, require explicit DM approval.
          </p>
        </div>
      </div>
    </section>
  );
}
