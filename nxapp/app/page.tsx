
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import ParentChild from "../components/ParentChild";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
};

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type HomeProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const LIMIT = 12;

async function getProducts(
  page: number
): Promise<ProductsResponse> {
  const skip = (page - 1) * LIMIT;

  const response = await fetch(
    `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Impossible de récupérer les produits.");
  }

  return response.json();
}

export default async function Home({
  searchParams,
}: HomeProps) {
  const params = await searchParams;
  const requestedPage = Number(params.page ?? "1");

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  let data: ProductsResponse | null = null;
  let errorMessage = "";

  try {
    data = await getProducts(page);
  } catch {
    errorMessage =
      "Impossible de charger les produits. Vérifiez votre connexion puis réessayez.";
  }

  const totalPages = data
    ? Math.ceil(data.total / LIMIT)
    : 0;

  if (data && totalPages > 0 && page > totalPages) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-12 text-gray-900">
        <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 text-center shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-blue-700">
            Page introuvable
          </h1>

          <p className="mb-6 text-gray-600">
            Cette page du catalogue n’existe pas.
          </p>

          <Link
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Retour au catalogue
          </Link>
        </div>
      </main>
    );
  }

  const startPage = Math.max(
    1,
    Math.min(page - 2, totalPages - 4)
  );

  const endPage = Math.min(totalPages, startPage + 4);

  const pageNumbers = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, index) => startPage + index
  );

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12 text-gray-900">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10">
          <h1 className="mb-3 text-4xl font-bold text-blue-700">
            Catalogue de produits
          </h1>

          <p className="text-gray-600">
            Découvrez les produits disponibles. Affichage de 12 produits par page.
          </p>
        </section>

        {errorMessage ? (
          <div
            role="alert"
            className="rounded-lg bg-red-100 p-5 text-red-700"
          >
            <p>{errorMessage}</p>

            <Link
              href="/"
              className="mt-3 inline-block font-semibold underline"
            >
              Réessayer
            </Link>
          </div>
        ) : data ? (
          <>
            <p className="mb-6 text-sm text-gray-600">
              Page {page} sur {totalPages} — {data.total} produits au total
            </p>

            {data.products.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    category={product.category}
                    thumbnail={product.thumbnail}
                    rating={product.rating}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-white p-8 text-center text-gray-600">
                Aucun produit disponible sur cette page.
              </div>
            )}

            {totalPages > 1 && (
              <nav
                aria-label="Pagination"
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
              >
                {page > 1 ? (
                  <Link
                    href={`/?page=${page - 1}`}
                    rel="prev"
                    className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
                  >
                    ← Précédent
                  </Link>
                ) : (
                  <span className="cursor-not-allowed rounded-lg bg-gray-200 px-4 py-3 text-gray-400">
                    ← Précédent
                  </span>
                )}

                {pageNumbers.map((pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={
                      pageNumber === 1
                        ? "/"
                        : `/?page=${pageNumber}`
                    }
                    aria-current={
                      pageNumber === page ? "page" : undefined
                    }
                    aria-label={`Page ${pageNumber}`}
                    className={`min-w-11 rounded-lg px-4 py-3 text-center font-semibold transition ${
                      pageNumber === page
                        ? "bg-blue-700 text-white"
                        : "bg-white text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                ))}

                {page < totalPages ? (
                  <Link
                    href={`/?page=${page + 1}`}
                    rel="next"
                    className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
                  >
                    Suivant →
                  </Link>
                ) : (
                  <span className="cursor-not-allowed rounded-lg bg-gray-200 px-4 py-3 text-gray-400">
                    Suivant →
                  </span>
                )}
              </nav>
            )}
          </>
        ) : null}

        <ParentChild />
      </div>
    </main>
  );
}
