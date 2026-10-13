import Link from "next/link";
import { cookies } from "next/headers";

import PlayerLogin from "@/components/auth/player-login";
import { SESSION_COOKIE, verifySession } from "@/server/auth/session";
import { varek } from "@/server/ai/varek";

export const dynamic = "force-dynamic";

export default async function EnterPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  const authenticated = verifySession(session);

  return (
    <main className="min-h-screen bg-[#100E0C] text-[#E6D3B5]">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <Link
          href="/"
          className="mb-12 text-sm text-[#D49B62] hover:text-white"
        >
          ← Return to Athas
        </Link>

        {authenticated ? (
          <>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#D49B62]">
              A Voice from the Wastes
            </p>

            <h1 className="text-5xl font-bold tracking-wide">{varek.name}</h1>

            <p className="mt-2 text-xl text-[#D49B62]">{varek.title}</p>

            <div className="mt-10 border-l-2 border-[#8b6239] pl-6">
              <p className="whitespace-pre-line text-lg italic leading-relaxed">
                {varek.greeting}
              </p>
            </div>

            <div className="mt-12 rounded border border-[#493727] bg-[#1d1712] p-6">
              <p className="text-[#C6B5A1]">
                Varek is waiting by the fire. The conversation interface is
                coming next.
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#D49B62]">
              Restricted Access
            </p>

            <h1 className="text-4xl font-semibold">Definitely Not a Mimic</h1>

            <p className="mt-6 text-lg italic text-[#C6B5A1]">
              &ldquo;Please enter your password. The chest promises it
              isn&apos;t a mimic.&rdquo;
            </p>

            <PlayerLogin />
          </>
        )}
      </div>
    </main>
  );
}
