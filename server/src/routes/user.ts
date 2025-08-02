import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import { updateUserStatus } from '../controllers/userStatus.controller.ts';
import { deleteUsers } from '../controllers/userDelete.controller.ts';
import { blockUsers } from '../controllers/userBlock.controller.ts';
import { unblockUsers } from '../controllers/userUnblock.controller.ts';

const router = Router();

router.get('/', authMiddleware, getAllUsers);
router.patch('/status', authMiddleware, updateUserStatus);
router.delete('/', authMiddleware, deleteUsers);
router.patch('/block', authMiddleware, blockUsers);
router.patch('/unblock', authMiddleware, unblockUsers);

export default router;
