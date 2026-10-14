"use client";

import { useState } from "react";
import equipmentData from "@/data/equipment.json";

type EquipmentTab = "weapons" | "armor" | "metal";

const tabs: { id: EquipmentTab; label: string; icon: string }[] = [
  { id: "weapons", label: "Weapons", icon: "⚔" },
  { id: "armor", label: "Armor", icon: "⛨" },
  { id: "metal", label: "The Value of Metal", icon: "◆" },
];

function signed(value: number): string {
  return value > 0 ? `+${value}` : String(value);
}

export default function EquipmentSection() {
  const [activeTab, setActiveTab] = useState<EquipmentTab>("weapons");

  const [selectedMaterial, setSelectedMaterial] = useState("bone");

  const selectedWeapon = equipmentData.weapons.materials.find(
    (material) => material.id === selectedMaterial,
  );

  return (
    <section id="equipment" className="space-y-10">
      <header className="max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
          Survival Has a Price
        </p>

        <h2 className="font-serif text-4xl font-bold">
          Weapons, Armor & Metal
        </h2>

        <p className="mt-4 leading-relaxed text-stone-400">
          On Athas, the material from which a weapon is made can mean the
          difference between survival and death. Metal is wealth, protection,
          and power.
        </p>
      </header>

      {/* Equipment category selection */}
      <nav aria-label="Equipment categories" className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={active}
              className={`rounded-lg border px-5 py-3
                text-sm font-semibold transition-colors
                focus-visible:outline-2
                focus-visible:outline-amber-500
                ${
                  active
                    ? "border-amber-500 bg-amber-950/50 text-amber-300"
                    : "border-stone-700 bg-stone-900 text-stone-400 hover:border-amber-700 hover:text-stone-200"
                }`}
            >
              <span aria-hidden="true">{tab.icon} </span>
              {tab.label}
            </button>
          );
        })}
      </nav>

      {activeTab === "weapons" && (
        <div className="space-y-10">
          <SectionHeading
            title="Weapons of Athas"
            description={equipmentData.weapons.introduction}
          />

          <div className="overflow-x-auto rounded-xl border border-stone-800">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-amber-950/30 text-amber-400">
                <tr>
                  <th className="p-4">Material</th>
                  <th className="p-4">Attack</th>
                  <th className="p-4">Damage</th>
                  <th className="p-4">Rarity</th>
                </tr>
              </thead>
              <tbody>
                {equipmentData.weapons.materials.map((material) => (
                  <tr key={material.id} className="border-t border-stone-800">
                    <td className="p-4 font-semibold">{material.name}</td>
                    <td className="p-4 text-amber-400">
                      {signed(material.attackBonus)}
                    </td>
                    <td className="p-4 text-amber-400">
                      {signed(material.damageBonus)}
                    </td>
                    <td className="p-4 text-stone-400">{material.rarity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive example */}
          <div className="rounded-xl border border-amber-900/40 bg-amber-950/10 p-6">
            <h3 className="font-serif text-2xl">Example: The Longsword</h3>

            <p className="mt-2 text-sm text-stone-400">
              Choose a material to see how it affects a standard longsword.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {equipmentData.weapons.materials.map((material) => (
                <button
                  key={material.id}
                  type="button"
                  onClick={() => setSelectedMaterial(material.id)}
                  aria-pressed={selectedMaterial === material.id}
                  className={`rounded-md border px-3 py-2 text-sm ${
                    selectedMaterial === material.id
                      ? "border-amber-500 bg-amber-900/40 text-amber-300"
                      : "border-stone-700 text-stone-400 hover:border-amber-700"
                  }`}
                >
                  {material.name}
                </button>
              ))}
            </div>

            {selectedWeapon && (
              <div className="mt-6 space-y-3">
                <div className="grid gap-4 sm:grid-cols-2">
                  <StatBox
                    label="Material Attack Modifier"
                    value={signed(selectedWeapon.attackBonus)}
                  />

                  <StatBox
                    label="Weapon Damage"
                    value={`1d8${
                      selectedWeapon.damageBonus > 0
                        ? ` + ${selectedWeapon.damageBonus}`
                        : selectedWeapon.damageBonus < 0
                          ? ` - ${Math.abs(selectedWeapon.damageBonus)}`
                          : ""
                    }`}
                  />
                </div>

                <p className="text-sm leading-relaxed text-stone-400">
                  {selectedWeapon.special}
                </p>

                <p className="text-xs text-stone-500">
                  Example uses one-handed damage. Ability, proficiency, and
                  other applicable bonuses are not included.
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {equipmentData.weapons.breakageRules.map((rule) => (
              <RuleCard
                key={rule.title}
                title={rule.title}
                description={rule.description}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "armor" && (
        <div className="space-y-10">
          <SectionHeading
            title="Armor of Athas"
            description={equipmentData.armor.introduction}
          />

          <div>
            <h3 className="mb-5 text-2xl font-semibold">Armor Materials</h3>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {equipmentData.armor.materials.map((material) => (
                <div
                  key={material.id}
                  className="rounded-xl border border-stone-800 bg-stone-900/50 p-5"
                >
                  <p className="font-semibold">{material.name}</p>

                  <p className="mt-3 font-serif text-2xl text-amber-400">
                    {signed(material.acBonus)} AC
                  </p>

                  <p className="mt-2 text-sm text-stone-400">
                    {material.durability}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {equipmentData.armor.categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div>
                <h3 className="font-serif text-2xl text-amber-400">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-stone-400">
                  {category.description}
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-stone-800">
                <table className="w-full min-w-[540px] text-left text-sm">
                  <thead className="bg-stone-900 text-stone-300">
                    <tr>
                      <th className="p-4">Armor</th>
                      <th className="p-4">Base AC</th>
                      <th className="p-4">Construction</th>
                    </tr>
                  </thead>

                  <tbody>
                    {category.items.map((item) => (
                      <tr key={item.name} className="border-t border-stone-800">
                        <td className="p-4 font-semibold">{item.name}</td>
                        <td className="p-4 text-amber-400">{item.ac}</td>
                        <td className="p-4 text-stone-400">
                          {item.construction}
                          {"rarity" in item && (
                            <span className="mt-1 block text-xs text-amber-500">
                              {item.rarity}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="grid gap-4 md:grid-cols-2">
            {equipmentData.armor.rules.map((rule) => (
              <RuleCard
                key={rule.title}
                title={rule.title}
                description={rule.description}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "metal" && (
        <div className="space-y-10">
          <header className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
              The Wealth of Kings
            </p>
            <h3 className="font-serif text-4xl">{equipmentData.metal.title}</h3>
            <p className="font-serif text-xl italic text-amber-400">
              {equipmentData.metal.tagline}
            </p>
            <p className="leading-relaxed text-stone-400">
              {equipmentData.metal.introduction}
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {equipmentData.metal.facts.map((fact) => (
              <RuleCard
                key={fact.title}
                title={fact.title}
                description={fact.description}
              />
            ))}
          </div>

          <div className="space-y-5">
            <h3 className="font-serif text-2xl">What Equipment Is Worth</h3>

            <div className="overflow-x-auto rounded-xl border border-stone-800">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-amber-950/30 text-amber-400">
                  <tr>
                    <th className="p-4">Equipment</th>
                    <th className="p-4">Economic Significance</th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentData.metal.economy.map((entry) => (
                    <tr key={entry.item} className="border-t border-stone-800">
                      <td className="p-4 font-semibold">{entry.item}</td>
                      <td className="p-4 text-stone-400">{entry.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <blockquote className="border-l-2 border-amber-600 pl-5 font-serif text-xl italic text-stone-300">
            An iron dagger may buy a gladiator. A steel sword may buy the
            loyalty of an army.
          </blockquote>
        </div>
      )}
    </section>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="max-w-3xl">
      <h3 className="font-serif text-3xl text-amber-400">{title}</h3>
      <p className="mt-4 leading-relaxed text-stone-400">{description}</p>
    </header>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-stone-800 bg-stone-900/70 p-4">
      <p className="text-xs uppercase tracking-wider text-stone-500">{label}</p>
      <p className="mt-2 font-serif text-3xl text-amber-400">{value}</p>
    </div>
  );
}

function RuleCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-xl border border-stone-800 bg-stone-900/50 p-5">
      <h4 className="font-semibold text-amber-400">{title}</h4>
      <p className="mt-3 text-sm leading-relaxed text-stone-400">
        {description}
      </p>
    </article>
  );
}
