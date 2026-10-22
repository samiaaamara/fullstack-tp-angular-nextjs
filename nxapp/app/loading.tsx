export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

      <h1 className="mt-6 text-2xl font-bold text-blue-700">
        Chargement des produits...
      </h1>

      <p className="mt-2 text-gray-600">
        Veuillez patienter quelques instants.
      </p>
    </main>
  );
}