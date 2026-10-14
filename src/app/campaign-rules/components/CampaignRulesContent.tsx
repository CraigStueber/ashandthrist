"use client";

import { useRouter, useSearchParams } from "next/navigation";
import RacesSection from "./RacesSection";
import LostRacesSection from "./LostRacesSection";
import EquipmentSection from "./EquipmentSection";
const sections = [
  { id: "races", label: "Playable Races", icon: "♟" },
  { id: "classes", label: "Classes", icon: "⚔" },
  { id: "magic", label: "Magic & Defiling", icon: "✦" },
  { id: "psionics", label: "Psionics", icon: "◈" },
  { id: "equipment", label: "Weapons & Armor", icon: "⛨" },
  { id: "creation", label: "Character Creation", icon: "✎" },
  { id: "rules", label: "Campaign Rules", icon: "▤" },
] as const;

type SectionId = (typeof sections)[number]["id"];

function isSectionId(value: string | null): value is SectionId {
  return sections.some((section) => section.id === value);
}

export default function CampaignRulesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const requestedSection = searchParams.get("section");

  const activeSection = isSectionId(requestedSection)
    ? requestedSection
    : "races";

  function selectSection(section: SectionId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", section);

    router.push(`/campaign-rules?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="space-y-12">
      {/* Main subject navigation */}
      <nav
        aria-label="Campaign rule sections"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => selectSection(section.id)}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex min-h-28 flex-col items-center
                justify-center gap-3 rounded-xl
                border p-5 text-center transition-all
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-amber-500
                ${
                  isActive
                    ? "border-amber-600 bg-amber-950/40 text-amber-400"
                    : "border-stone-800 bg-stone-900/60 text-stone-400 hover:border-amber-900 hover:text-stone-200"
                }
              `}
            >
              <span aria-hidden="true" className="text-2xl">
                {section.icon}
              </span>

              <span className="text-sm font-semibold">{section.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Display only the selected section */}
      <div key={activeSection}>
        {activeSection === "races" && (
          <div className="space-y-16">
            <RacesSection />
            <LostRacesSection />
          </div>
        )}

        {activeSection === "equipment" && <EquipmentSection />}

        {activeSection === "classes" && (
          <SectionPlaceholder title="Classes on Athas" />
        )}

        {activeSection === "magic" && (
          <SectionPlaceholder title="Magic & Defiling" />
        )}

        {activeSection === "psionics" && (
          <SectionPlaceholder title="Psionics" />
        )}

        {activeSection === "creation" && (
          <SectionPlaceholder title="Character Creation" />
        )}

        {activeSection === "rules" && (
          <SectionPlaceholder title="Campaign Rules" />
        )}
      </div>
    </div>
  );
}

function SectionPlaceholder({
  title,
  description = "This section is still being developed.",
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="rounded-xl border border-stone-800 bg-stone-900/40 p-8">
      <h2 className="font-serif text-3xl text-amber-400">{title}</h2>

      <p className="mt-4 text-stone-400">{description}</p>
    </section>
  );
}
