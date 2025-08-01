import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import { updateUserStatus } from '../controllers/userStatus.controller.ts';
import { deleteUsers } from '../controllers/userDelete.controller.ts';

const router = Router();

router.get('/', authMiddleware, getAllUsers);
router.patch('/status', authMiddleware, updateUserStatus);
router.delete('/', authMiddleware, deleteUsers);

export default router;
