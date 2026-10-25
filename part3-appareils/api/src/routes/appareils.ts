
import { Router, type Request, type Response, type NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { z } from 'zod';
import { Appareil } from '../models/Appareil.js';

const router = Router();

const appareilSchema = z.object({
  name: z.string().trim().min(2).max(100),
  status: z.enum(['On', 'Off']).optional(),
});

const idSchema = z.string().refine(isValidObjectId, 'Identifiant MongoDB invalide');

function validateId(req: Request, res: Response, next: NextFunction) {
  const result = idSchema.safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({
      message: 'Identifiant invalide',
      errors: result.error.issues,
    });
    return;
  }

  next();
}

// GET /api/appareils : liste des appareils
router.get('/', async (_req, res, next) => {
  try {
    const appareils = await Appareil.find().sort({ createdAt: -1 });
    res.json(appareils);
  } catch (error) {
    next(error);
  }
});

// GET /api/appareils/:id : détail d'un appareil
router.get('/:id', validateId, async (req, res, next) => {
  try {
    const appareil = await Appareil.findById(req.params.id);

    if (!appareil) {
      res.status(404).json({ message: 'Appareil introuvable' });
      return;
    }

    res.json(appareil);
  } catch (error) {
    next(error);
  }
});

// POST /api/appareils : créer un appareil
router.post('/', async (req, res, next) => {
  try {
    const result = appareilSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: 'Données invalides',
        errors: result.error.issues,
      });
      return;
    }

    const appareil = await Appareil.create({
      name: result.data.name,
      status: result.data.status ?? 'Off',
    });

    res.status(201).json(appareil);
  } catch (error) {
    next(error);
  }
});

// PUT /api/appareils/:id : modifier un appareil
router.put('/:id', validateId, async (req, res, next) => {
  try {
    const result = appareilSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: 'Données invalides',
        errors: result.error.issues,
      });
      return;
    }

    const appareil = await Appareil.findByIdAndUpdate(
      req.params.id,
      {
        name: result.data.name,
        ...(result.data.status !== undefined && { status: result.data.status }),
      },
      { new: true, runValidators: true },
    );

    if (!appareil) {
      res.status(404).json({ message: 'Appareil introuvable' });
      return;
    }

    res.json(appareil);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/appareils/:id : supprimer un appareil
router.delete('/:id', validateId, async (req, res, next) => {
  try {
    const appareil = await Appareil.findByIdAndDelete(req.params.id);

    if (!appareil) {
      res.status(404).json({ message: 'Appareil introuvable' });
      return;
    }

    res.json({ message: 'Appareil supprimé avec succès' });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/appareils/switch-all : inverser l'état de tous les appareils
router.patch('/switch-all', async (_req, res, next) => {
  try {
    const appareils = await Appareil.find();

    for (const appareil of appareils) {
      appareil.status = appareil.status === 'On' ? 'Off' : 'On';
      await appareil.save();
    }

    res.json({
      message: `${appareils.length} appareil(s) mis à jour`,
      appareils,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
