
"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-center text-gray-900">
      <h1 className="mb-4 text-4xl font-bold text-red-600">
        Une erreur est survenue
      </h1>

      <p className="mb-6 text-gray-600">
        Impossible d'afficher les produits pour le moment.
      </p>

      <button
        onClick={reset}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Réessayer
      </button>
    </main>
  );
}
