import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#100E0C] text-[#E6D3B5]">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.25em] uppercase"
        >
          Ash & Thirst
        </Link>

        <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-[#D49B62]">
          <a href="#world" className="hover:text-white">
            The World
          </a>
          <a href="#journey" className="hover:text-white">
            The Journey
          </a>
          <span className="cursor-not-allowed opacity-40">Enter</span>
        </nav>
      </header>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/athas-hero.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#100E0C]/50 via-[#100E0C]/40 to-[#100E0C]" />

        <div className="relative z-10 mx-auto max-w-4xl pt-20">
          <p className="mb-8 text-xs uppercase tracking-[0.45em] text-[#D49B62]">
            A Dark Sun Campaign
          </p>

          <h1 className="text-6xl font-semibold uppercase tracking-[0.12em] md:text-8xl">
            Ash
            <span className="block text-[#D49B62]">& Thirst</span>
          </h1>

          <div className="mx-auto my-10 h-px w-24 bg-[#A44830]" />

          <p className="text-xl italic text-[#E6D3B5] md:text-2xl">
            Freedom is a rumor. Survival is a choice.
          </p>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-[#C6B5A1] md:text-base">
            Beneath the crimson sun, the world is dying. Its cities are cruel.
            Its roads belong to those who can survive them.
          </p>

          <a
            href="#world"
            className="mt-12 inline-block border border-[#D49B62] px-9 py-4 text-xs uppercase tracking-[0.25em] transition hover:bg-[#D49B62] hover:text-[#100E0C]"
          >
            Discover Athas
          </a>
        </div>

        <div className="absolute bottom-8 text-xs uppercase tracking-[0.3em] text-[#D49B62]/70">
          Scroll to Explore
        </div>
      </section>

      <section
        id="world"
        className="border-t border-[#391D18] px-6 py-28 md:py-40"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#A44830]">
            The World of Athas
          </p>

          <h2 className="mb-10 text-4xl uppercase tracking-[0.12em] md:text-5xl">
            A World Without Mercy
          </h2>

          <p className="text-lg leading-9 text-[#C6B5A1]">
            Water is wealth. Steel is legend. Sorcerer-kings rule from cities
            built upon suffering.
          </p>

          <p className="mt-6 text-lg leading-9 text-[#C6B5A1]">
            Beyond their walls stretch endless wastes, forgotten ruins, and
            roads where every traveler is either predator or prey.
          </p>
        </div>
      </section>

      <section id="journey" className="bg-[#1B1410] px-6 py-28 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#A44830]">
            The Journey
          </p>

          <h2 className="mb-10 text-4xl uppercase tracking-[0.12em] md:text-5xl">
            The Chains Will Break
          </h2>

          <p className="text-lg leading-9 text-[#C6B5A1]">
            You were bought. You were branded. You were marched toward a fate
            someone else had chosen.
          </p>

          <p className="mt-6 text-lg leading-9 text-[#C6B5A1]">
            Somewhere beyond the wastes, whispers speak of a city where no one
            wears chains.
          </p>

          <p className="mt-10 text-xl italic text-[#D49B62]">
            Not every rumor is true.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#391D18] px-6 py-10 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[#8D7967]">
          Ash & Thirst — A Dark Sun Campaign
        </p>
      </footer>
    </main>
  );
}
