import { Router } from 'express';
import { registerUser } from '../services/register.service.ts';
import { handleLogin } from '../controllers/login.controller.ts';
import { getProfile } from '../controllers/profile.controller.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import { handleRegister } from '../controllers/auth.controller.ts';

const router = Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/profile', authMiddleware, getProfile)

export default router;
