import { Router, Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User';

const router = Router();

// GET /api/users?query=string&email=string&phoneNumber=string
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query, email, phoneNumber } = req.query;

    let filter: any = {};

    if (query) {
      filter.$or = [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
      ];
    }

    if (email) {
      filter.email = email;
    }

    if (phoneNumber) {
      filter.phoneNumber = phoneNumber;
    }

    const users = await User.find(filter).exec();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).exec();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST /api/users
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:id
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id).exec();
    res.json(deletedUser ? true : false);
  } catch (err) {
    next(err);
  }
});

export default router;
