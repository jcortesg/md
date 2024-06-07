import { NextFunction, Request, Response, Router } from 'express';
import { Category } from '../database/models/category.model';

const router: Router = Router();

/**
 * POST /categories
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = new Category(req.body.category);
    await category.save();
    res.status(201).json({ category });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /categories
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
});

export const CategoriesRoutes: Router = router;