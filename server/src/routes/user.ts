import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const router = Router();

router.get('/', authMiddleware, getAllUsers);

export default router;
