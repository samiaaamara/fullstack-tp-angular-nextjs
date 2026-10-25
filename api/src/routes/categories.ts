
import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const categoriesRouter = Router();

// GET : récupérer toutes les catégories
categoriesRouter.get("/", async (_req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: "asc" },
    });

    res.json({ data: categories, total: categories.length });
  } catch {
    res.status(500).json({
      error: "Impossible de récupérer les catégories",
    });
  }
});

// GET : récupérer une catégorie par son ID
categoriesRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Identifiant de catégorie invalide",
      });
    }

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      return res.status(404).json({
        error: "Catégorie introuvable",
      });
    }

    return res.json({ data: category });
  } catch {
    return res.status(500).json({
      error: "Impossible de récupérer la catégorie",
    });
  }
});