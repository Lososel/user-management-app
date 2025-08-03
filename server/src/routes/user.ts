import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { updateUserStatus } from '../controllers/userStatus.controller.js';
import { deleteUsers } from '../controllers/userDelete.controller.js';
import { blockUsers } from '../controllers/userBlock.controller.js';
import { unblockUsers } from '../controllers/userUnblock.controller.js';

const router = Router();

router.get('/', authMiddleware, getAllUsers);
router.patch('/status', authMiddleware, updateUserStatus);
router.delete('/', authMiddleware, deleteUsers);
router.patch('/block', authMiddleware, blockUsers);
router.patch('/unblock', authMiddleware, unblockUsers);

export default router;
