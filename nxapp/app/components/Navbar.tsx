"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/login", label: "Login" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

function NavbarContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-blue-700 text-white shadow-md">
      <nav
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-6 py-4"
        aria-label="Navigation principale"
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="text-xl font-bold tracking-wide"
        >
          FullStack TP
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          className="rounded-lg border border-blue-400 px-3 py-2 md:hidden"
        >
          {menuOpen ? "Fermer" : "Menu"}
        </button>

        <div
          className={`${menuOpen ? "flex" : "hidden"} w-full flex-col gap-2 pt-4 md:flex md:w-auto md:flex-row md:items-center md:gap-3 md:pt-0`}
        >
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-4 py-2 font-medium transition ${
                  active
                    ? "bg-white text-blue-700"
                    : "text-blue-50 hover:bg-blue-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-50 bg-blue-700 px-6 py-4 text-white">
          <Link href="/">FullStack TP</Link>
        </header>
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
