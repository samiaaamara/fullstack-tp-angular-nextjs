
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center text-gray-900">
      <h1 className="mb-4 text-7xl font-bold text-blue-700">
        404
      </h1>

      <h2 className="mb-3 text-2xl font-semibold">
        Page introuvable
      </h2>

      <p className="mb-8 text-gray-600">
        Désolé, la page que vous recherchez n'existe pas.
      </p>

      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Retour à l'accueil
      </Link>
    </main>
  );
}
