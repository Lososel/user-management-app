import { Router } from 'express';
import { registerUser } from '../controllers/authController.ts';

const router = Router();

router.post('/register', registerUser);

export default router;
