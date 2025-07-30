import { Router } from 'express';
import { registerUser } from '../services/register.service.ts';
import { handleLogin } from '../controllers/loginController.ts';

const router = Router();

router.post('/register', registerUser);
router.post('/login', handleLogin);

export default router;
