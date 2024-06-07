import { Router, Request, Response, NextFunction } from 'express';
import { Topic } from '../database/models/topic.model';

const router = Router();

// Crear una nueva temática
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = new Topic(req.body.topic);
    await topic.save();
    res.json({ topic });
  } catch (error) {
    next(error);
  }
});

// Obtener todas las temáticas
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await Topic.find();
    res.json({ topics });
  } catch (error) {
    next(error);
  }
});

export const TopicsRouter: Router = router;