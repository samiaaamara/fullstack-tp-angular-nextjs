import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { productSchema } from "../schemas/product.js";

export const productsRouter = Router();



productsRouter.get("/", async (req, res) => {
  try {
    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      100
    );
    const skip = Math.max(Number(req.query.skip) || 0, 0);

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : "";

    const categoryId =
      typeof req.query.categoryId === "string"
        ? Number(req.query.categoryId)
        : undefined;

    const where = {
      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                description: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
      ...(categoryId !== undefined && Number.isInteger(categoryId)
        ? { categoryId }
        : {}),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { id: "asc" },
        take: limit,
        skip,
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      data: products,
      total,
      limit,
      skip,
    });
  } catch {
    res.status(500).json({
      error: "Impossible de récupérer les produits",
    });
  }
});



productsRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Identifiant invalide" });
    return;
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      res.status(404).json({ error: "Produit introuvable" });
      return;
    }

    res.json({ data: product });
  } catch {
    res.status(500).json({ error: "Impossible de récupérer le produit" });
  }
});

productsRouter.post("/", async (req, res) => {
  const parsed = productSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Données invalides",
      details: parsed.error.flatten(),
    });
    return;
  }

  try {
    const product = await prisma.product.create({
      data: parsed.data,
      include: { category: true },
    });

    res.status(201).json({ data: product });
    } catch (error) {
    console.error("Erreur détaillée lors de la création :", error);

    res.status(500).json({
      error: "Erreur interne lors de la création du produit",
    });
  }
});

productsRouter.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Identifiant invalide" });
    return;
  }

  const parsed = productSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Données invalides",
      details: parsed.error.flatten(),
    });
    return;
  }

  try {
    const product = await prisma.product.update({
      where: { id },
      data: parsed.data,
      include: { category: true },
    });

    res.json({ data: product });
  } catch {
    res.status(404).json({ error: "Produit introuvable ou catégorie invalide" });
  }
});

productsRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Identifiant invalide" });
    return;
  }

  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Produit introuvable" });
  }
});