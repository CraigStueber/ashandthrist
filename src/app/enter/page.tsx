import Link from "next/link";
import { cookies } from "next/headers";

import PlayerLogin from "@/components/auth/player-login";
import NpcChat from "@/components/chat/npc-chat";
import { SESSION_COOKIE, verifySession } from "@/server/auth/session";

export const dynamic = "force-dynamic";

export default async function EnterPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  const authenticated = verifySession(session);

  if (authenticated) {
    return (
      <main className="min-h-screen bg-[#100E0C] text-[#E6D3B5]">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <header className="mb-6 flex items-center justify-between border-b border-[#59402B] pb-5">
            <Link href="/" className="font-serif text-xl tracking-widest">
              ASH <span className="text-[#D49B62]">&</span> THIRST
            </Link>
            <Link href="/" className="text-sm text-[#D49B62] hover:text-white">
              ← Return to Athas
            </Link>
          </header>

          <NpcChat />

          <footer className="mt-5 flex justify-between border-t border-[#59402B] pt-4 text-xs text-[#A47B55]">
            <span>A voice from the wastes</span>
            <span>Not every tale told on Athas is true.</span>
          </footer>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100B08] text-[#E6D3B5]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#47201455,transparent_65%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] flex-col px-4 py-5 sm:px-8 lg:px-10">
        <header className="mb-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl tracking-[0.14em]">
            ASH <span className="text-[#D49B62]">&</span> THIRST
          </Link>

          <Link href="/" className="text-xs text-[#C99564] hover:text-white">
            ← Return to Athas
          </Link>
        </header>

        <div className="grid flex-1 overflow-hidden rounded-xl border border-[#69472B] shadow-[0_30px_100px_#00000099] lg:grid-cols-2">
          {/* Mimic artwork: use only the LEFT half of our image */}

          <div
            role="img"
            aria-label="A monstrous mimic treasure chest in the ruins of Athas"
            className="relative min-h-[280px] bg-cover bg-center sm:min-h-[380px] lg:min-h-[720px]"
            style={{
              backgroundImage: "url('/images/mimic-login.png')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#100B08]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#100B08]/30" />
          </div>

          {/* Functional login panel */}
          <section className="flex items-center justify-center bg-[#140E0B] px-6 py-12 sm:px-12 lg:px-14">
            <div className="w-full max-w-[500px]">
              <div className="text-center">
                <h1 className="font-serif text-4xl tracking-[0.08em] text-[#F3DFC1] sm:text-5xl">
                  ASH <span className="text-[#C9833C]">&</span> THIRST
                </h1>

                <p className="mt-4 text-xs uppercase tracking-[0.36em] text-[#BE8B5A]">
                  A Dark Sun Campaign
                </p>
              </div>

              <div className="my-10 h-px bg-gradient-to-r from-transparent via-[#765033] to-transparent" />

              <p className="text-xs uppercase tracking-[0.3em] text-[#C58B4D]">
                Restricted Access
              </p>

              <h2 className="mt-5 font-serif text-3xl text-[#F3DFC1] sm:text-4xl">
                Definitely Not a Mimic
              </h2>

              <p className="mt-6 text-center font-serif text-lg italic leading-relaxed text-[#CBB394]">
                &ldquo;Please enter your password.
                <br />
                The chest promises it isn&apos;t a mimic.&rdquo;
              </p>

              <div className="mt-10">
                <PlayerLogin />
              </div>

              <div className="mt-10 flex items-center gap-4 text-[#B27A42]">
                <div className="h-px flex-1 bg-[#624127]" />
                <span className="text-xl">☼</span>
                <div className="h-px flex-1 bg-[#624127]" />
              </div>

              <p className="mt-6 text-center text-[10px] uppercase tracking-[0.22em] text-[#A77A54]">
                In the wastes, not every treasure is what it seems.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
