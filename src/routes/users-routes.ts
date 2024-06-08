import { NextFunction, Request, Response, Router } from 'express';
import IUserModel, { User } from '../database/models/user.model';
import passport from 'passport';

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

/**
 * POST /api/users/login
 */
router.post('/login', (req: Request, res: Response, next: NextFunction) => {

  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "Can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "Can't be blank" } });
  }

  passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });

    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);

});

export const UsersRoutes: Router = router;

