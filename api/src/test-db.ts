import { prisma } from "./lib/prisma.js";

try {
  const categories = await prisma.category.count();
  const products = await prisma.product.count();

  console.log("Connexion PostgreSQL réussie !");
  console.log("Nombre de catégories :", categories);
  console.log("Nombre de produits :", products);
} catch (error) {
  console.error("Erreur de connexion :", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}