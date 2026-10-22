type SearchPageProps = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  const category = params.category ?? "Toutes les catégories";
  const page = params.page ?? "1";

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-16 text-gray-900">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-blue-700">
          Recherche
        </h1>

        <p className="mb-3">
          Catégorie : <strong>{category}</strong>
        </p>

        <p className="mb-6">
          Page : <strong>{page}</strong>
        </p>

        <a href="/" className="text-blue-600 hover:underline">
          Retour à l’accueil
        </a>
      </div>
    </main>
  );
}