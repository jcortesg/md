import { Request, Response, NextFunction } from 'express';
import { Content } from '../database/models/content-model';
import { User } from '../database/models/user.model';
import { Topic } from '../database/models/topic.model';
import { Category } from '../database/models/category.model';
import authentication from '../middleware/authentication';
import { router } from './contents-routes';

// Crear contenido
router.post('/', authentication, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title, description, type, url, body, topic, category,
    } = req.body.content;

    const createdBy = (req as any).token.id;
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
