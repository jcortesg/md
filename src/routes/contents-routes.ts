import { Router, Request, Response, NextFunction } from 'express';
import { Content } from '../database/models/content.model';
import { User } from '../database/models/user.model';
import { Topic } from '../database/models/topic.model';
import { Category } from '../database/models/category.model';

const router: Router = Router();

// Crear contenido
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      description,
      type,
      url,
      body,
      createdBy,
      topic,
      category
    } = req.body;

    // Verificar que el usuario, el tema y la categoría existan
    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const topicExists = await Topic.findById(topic);
    if (!topicExists) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const content = new Content({
      title,
      description,
      type,
      url,
      body,
      createdBy,
      topic,
      category
    });
    await content.save();

    res.status(201).json({ content });
  } catch (error) {
    next(error);
  }
});

// Obtener contenido por ID
router.get('/contents/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await Content.findById(req.params.id).populate('createdBy').populate('topic').populate('category').populate('permissions.read').populate('permissions.write');
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ content });
  } catch (error) {
    next(error);
  }
});

// Actualizar contenido
router.put('/contents/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, type, url, text, topic, category, permissions } = req.body;

    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { title, description, type, url, text, topic, category, permissions },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ content });
  } catch (error) {
    next(error);
  }
});

// Eliminar contenido
router.delete('/contents/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export const ContentsRouter: Router = router
