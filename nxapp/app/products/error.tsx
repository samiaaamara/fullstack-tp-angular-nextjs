"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="mb-3 text-xl font-bold text-red-700">
          Une erreur est survenue !
        </h2>

        <p className="mb-4 text-gray-700">
          Impossible de charger le produit. Vérifie ta connexion Internet.
        </p>

        <button
          onClick={() => reset()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Réessayer
        </button>
      </div>
    </main>
  );
}