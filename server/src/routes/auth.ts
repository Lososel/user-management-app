import { Router } from 'express';
import { handleLogin } from '../controllers/login.controller.js';
import { getProfile } from '../controllers/profile.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { handleRegister } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/profile', authMiddleware, getProfile);

export default router;
