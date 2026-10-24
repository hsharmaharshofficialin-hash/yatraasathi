import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cinzel, Inter, Noto_Serif_Devanagari } from "next/font/google";
import { AppChrome } from "@/components/AppChrome";
import { AppProvider } from "@/hooks/useClient";
import GlobalMenu from "@/components/GlobalMenu";
import "./globals.css";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-deva",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "YatraSathi — Go further. Feel closer.",
  description:
    "Honest travel companion for India. Cited cultural narratives, Sanskar etiquette cards, and the Pramaan claim ledger. Unknown is a valid answer.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} ${devanagari.variable} font-[family-name:var(--font-sans)] antialiased`}
      >
        <AppProvider>
          <AppChrome>{children}</AppChrome>
        <GlobalMenu />
        </AppProvider>
      </body>
    </html>
  );
}
