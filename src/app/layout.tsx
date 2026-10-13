import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashandthirst.com"),

  title: {
    default: "Ash & Thirst | A Dark Sun Campaign",
    template: "%s | Ash & Thirst",
  },

  description:
    "Beneath the crimson sun of Athas, freedom is a rumor and survival is a choice. Enter Ash & Thirst, a Dark Sun Dungeons & Dragons campaign.",

  applicationName: "Ash & Thirst",

  keywords: [
    "Ash and Thirst",
    "Dark Sun",
    "Athas",
    "Dungeons and Dragons",
    "D&D",
    "Dark Sun Campaign",
    "Tabletop RPG",
    "Fantasy Roleplaying",
  ],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashandthirst.com",
    siteName: "Ash & Thirst",
    title: "Ash & Thirst | A Dark Sun Campaign",
    description: "Freedom is a rumor. Survival is a choice.",
    images: [
      {
        url: "/images/athas-hero.jpg",
        width: 1792,
        height: 1024,
        alt: "The burning crimson sun rises over the wastelands of Athas.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ash & Thirst | A Dark Sun Campaign",
    description: "Freedom is a rumor. Survival is a choice.",
    images: ["/images/athas-hero.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#100E0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#100E0C] text-[#E6D3B5]">{children}</body>
    </html>
  );
}
