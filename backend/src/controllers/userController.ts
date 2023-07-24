import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/User';


  
  // Controller for GET /api/users
  export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
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
  };
  
  // Controller for GET /api/users/:id
  export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id).exec();
      res.json(user);
    } catch (err) {
      next(err);
    }
  };
  
  // Controller for POST /api/users
  export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      next(err);
    }
  };
  
  // Controller for PUT /api/users/:id
  export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).exec();
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  };
  
  // Controller for DELETE /api/users/:id
  export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id).exec();
      res.json(deletedUser ? true : false);
    } catch (err) {
      next(err);
    }
  };