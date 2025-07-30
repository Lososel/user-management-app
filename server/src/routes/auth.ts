import { Router } from 'express';
import { registerUser } from '../services/userService.ts';

const router = Router();

router.post('/register', registerUser);

export default router;
