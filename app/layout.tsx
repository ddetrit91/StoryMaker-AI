import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StoryMaker AI — генератор Instagram Stories",
  description:
    "AI-генератор серии из 3 Instagram Stories для бизнеса: тексты, визуальные идеи и рекомендации по оформлению.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${manrope.variable} ${cormorant.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
