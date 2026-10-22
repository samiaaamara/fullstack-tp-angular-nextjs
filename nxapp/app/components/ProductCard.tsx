
import Link from "next/link";

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail?: string;
  description?: string;
  rating?: number;
};

export default function ProductCard({
  id,
  title,
  price,
  category,
  thumbnail,
  description,
  rating,
}: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-gray-100 text-gray-500">
          Image indisponible
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-sm text-gray-500">
          Catégorie : {category}
        </p>

        <h2 className="mb-3 text-lg font-bold text-blue-700">
          {title}
        </h2>

        {description && (
          <p className="mb-3 line-clamp-3 text-sm text-gray-600">
            {description}
          </p>
        )}

        {rating !== undefined && (
          <p className="mb-3 text-sm text-amber-600">
            ★ {rating.toFixed(1)} / 5
          </p>
        )}

        <p className="mb-4 text-xl font-bold text-gray-900">
          {price.toFixed(2)} $
        </p>

        <Link
          href={`/products/${id}`}
          className="mt-auto inline-block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          Voir les détails
        </Link>
      </div>
    </article>
  );
}
