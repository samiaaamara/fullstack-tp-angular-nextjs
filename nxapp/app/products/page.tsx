
type Product = {
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  category: string;
};

export default async function Products() {
  const response = await fetch("https://dummyjson.com/products/1", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load the product");
  }

  const product: Product = await response.json();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-blue-700">
        Product loaded from DummyJSON - Next.js
      </h1>

      <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="mb-4 h-56 w-full rounded-lg object-contain"
        />

        <h2 className="mb-2 text-xl font-semibold">
          {product.title}
        </h2>

        <p className="mb-4 text-gray-600">
          {product.description}
        </p>

        <p className="font-bold text-blue-700">
          Prix : {product.price}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Catégorie : {product.category}
        </p>
      </article>
    </main>
  );
}
