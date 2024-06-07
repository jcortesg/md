import { Router } from 'express';
import { UsersRoutes } from './users-routes';
import { CategoriesRoutes } from './categories-routes';
import { TopicsRouter } from './topics-routes';
import { ContentsRouter } from './contents-routes';

const router: Router = Router();

router.use('/users', UsersRoutes);
router.use('/categories', CategoriesRoutes);
router.use('/topics', TopicsRouter);
router.use('/contents', ContentsRouter);

export const MainRouter: Router = router; 