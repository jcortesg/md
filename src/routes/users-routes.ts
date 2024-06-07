import { NextFunction, Request, Response, Router } from 'express';
import IUserModel, { User } from '../database/models/user.model';

const router: Router = Router();

/**
 * POST /users
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, role } = req.body.user;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    const user: IUserModel = new User({
      username,
      email,
      role
    });

    user.setPassword(password);

    await user.save();

    return res.status(201).json({ user: user.toAuthJSON() });
  } catch (error) {
    next(error);
  }
});

export const UsersRoutes: Router = router;

