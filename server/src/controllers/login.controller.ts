import { Request, Response } from 'express';
import { loginUser } from '../services/login.service.js';
import { generateToken } from '../utils/jwt.js';

export async function handleLogin(req: Request, res: Response) {
  try {
    const user = await loginUser(req.body);
    res.status(200).json({ message: 'User logged in', ...user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: (error as Error).message });
  }
}
