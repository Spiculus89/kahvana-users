import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';
import { validateUserData } from '../validation';

const router = Router();

// GET /api/users?query=string&email=string&phoneNumber=string
router.get('/', getUsers);

// GET /api/users/:id
router.get('/:id', getUserById);

// POST /api/users
router.post('/', validateUserData, createUser);

// PUT /api/users/:id
router.put('/:id', validateUserData, updateUser);

// DELETE /api/users/:id
router.delete('/:id', deleteUser);

export default router;
