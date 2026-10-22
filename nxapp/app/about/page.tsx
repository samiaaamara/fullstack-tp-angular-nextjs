
import Link from "next/link";

const technologies = [
  {
    name: "Angular",
    description:
      "Framework front-end pour créer une application web avec des composants et des services.",
    icon: "🅰️",
  },
  {
    name: "Next.js",
    description:
      "Framework React qui facilite la création de pages et le rendu côté serveur.",
    icon: "▲",
  },
  {
    name: "Tailwind CSS",
    description:
      "Framework CSS pour concevoir une interface responsive avec des classes utilitaires.",
    icon: "🎨",
  },
  {
    name: "DummyJSON",
    description:
      "API REST utilisée pour récupérer les produits et leurs informations.",
    icon: "🔌",
  },
];

const features = [
  "Catalogue de produits dynamique",
  "Pagination des produits",
  "Cartes de produits réutilisables",
  "Page de détails pour chaque produit",
  "Validation des formulaires Login et Contact",
  "Navigation entre les différentes pages",
  "Gestion du chargement et des erreurs",
  "Interface adaptée aux écrans mobiles",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12 text-gray-900">
      <div className="mx-auto max-w-5xl">
        <section className="mb-10 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white shadow-lg md:p-12">
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-100">
            Présentation du projet
          </p>

          <h1 className="mb-5 text-4xl font-bold">
            À propos de FullStack TP
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-blue-50">
            Ce projet pratique permet de découvrir et de comparer
            le développement d’applications web avec Angular et
            Next.js, en utilisant une API REST pour afficher des
            données dynamiques.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-5 text-2xl font-bold">
            Technologies utilisées
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((technology) => (
              <article
                key={technology.name}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 text-3xl" aria-hidden="true">
                  {technology.icon}
                </div>

                <h3 className="mb-2 text-lg font-bold text-blue-700">
                  {technology.name}
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  {technology.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-5 text-2xl font-bold">
            Fonctionnalités du projet
          </h2>

          <ul className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-700"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-blue-50 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-blue-800">
            Découvrir le catalogue
          </h2>

          <p className="mb-6 text-gray-600">
            Consultez les produits et testez la navigation vers leurs détails.
          </p>

          <Link
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Voir les produits
          </Link>
        </section>
      </div>
    </main>
  );
}
