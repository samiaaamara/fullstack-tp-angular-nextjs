import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";

type DummyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  category: string;
};

type DummyResponse = {
  products: DummyProduct[];
};

async function main() {
  const existingCount = await prisma.product.count();

  if (existingCount > 0) {
    console.log(
      `La base contient déjà ${existingCount} produits. Importation ignorée.`,
    );
    return;
  }

  console.log("Téléchargement des produits DummyJSON...");

  const response = await fetch("https://dummyjson.com/products?limit=0");

  if (!response.ok) {
    throw new Error(`Erreur DummyJSON : ${response.status}`);
  }

  const data = (await response.json()) as DummyResponse;

  const categories = [
    ...new Set(data.products.map((product) => product.category)),
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log(`${categories.length} catégories vérifiées.`);

  for (const product of data.products) {
    const category = await prisma.category.findUnique({
      where: { name: product.category },
    });

    if (!category) {
      throw new Error(`Catégorie introuvable : ${product.category}`);
    }

    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        rating: product.rating,
        categoryId: category.id,
      },
      create: {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        rating: product.rating,
        categoryId: category.id,
      },
    });
  }

  console.log(`${data.products.length} produits importés ou mis à jour.`);
}

main()
  .catch((error) => {
    console.error("Erreur pendant le seed :", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });