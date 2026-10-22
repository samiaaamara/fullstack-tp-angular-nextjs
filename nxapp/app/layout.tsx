
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FullStack TP",
    template: "%s | FullStack TP",
  },
  description:
    "Application de démonstration Angular et Next.js avec un catalogue de produits.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />

        <div className="flex-1">{children}</div>

        <footer className="mt-auto border-t border-gray-200 bg-white px-6 py-6 text-center text-gray-500">
          <p className="font-semibold text-gray-700">FullStack TP</p>
          <p className="mt-1 text-sm">
            Angular · Next.js · Tailwind CSS · DummyJSON API
          </p>
          <p className="mt-2 text-xs">
            Projet pédagogique de développement Full Stack
          </p>
        </footer>
      </body>
    </html>
  );
}
