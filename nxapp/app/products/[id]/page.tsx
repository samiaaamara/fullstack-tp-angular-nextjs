
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand?: string;
};

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `https://dummyjson.com/products/${encodeURIComponent(id)}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    throw new Error("Produit introuvable.");
  }

  if (!response.ok) {
    throw new Error("Impossible de récupérer le produit.");
  }

  return response.json();
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id) || Number(id) < 1) {
    throw new Error("Identifiant de produit invalide.");
  }

  const product = await getProduct(id);

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12 text-gray-900">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-block font-semibold text-blue-700 hover:underline"
        >
          ← Retour au catalogue
        </Link>

        <article className="grid gap-8 overflow-hidden rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-80 w-full rounded-xl bg-gray-50 object-contain"
            />

            {product.images?.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {product.images.slice(1, 4).map((image, index) => (
                  <img
                    key={`${product.id}-${index}`}
                    src={image}
                    alt={`${product.title} ${index + 2}`}
                    className="h-24 w-full rounded-lg bg-gray-50 object-contain"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
              {product.category}
            </p>

            <h1 className="mb-4 text-3xl font-bold">
              {product.title}
            </h1>

            {product.brand && (
              <p className="mb-3 text-gray-600">
                Marque : {product.brand}
              </p>
            )}

            <p className="mb-6 leading-7 text-gray-600">
              {product.description}
            </p>

            <p className="mb-4 text-3xl font-bold text-blue-700">
              {product.price.toFixed(2)} $
            </p>

            <div className="mb-6 space-y-2 rounded-lg bg-gray-50 p-4">
              <p>
                <strong>Note :</strong>{" "}
                {product.rating.toFixed(1)} / 5 ★
              </p>
              <p>
                <strong>Stock :</strong> {product.stock}
              </p>
              <p>
                <strong>Identifiant :</strong> {product.id}
              </p>
            </div>

            <Link
              href="/"
              className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Retour aux produits
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
