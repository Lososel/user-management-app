import { Request, Response } from 'express';
import { loginUser } from '../services/login.service.ts';

export async function handleLogin(req: Request, res: Response) {
  try {
    const user = await loginUser(req.body);
    res.status(201).json({ message: 'User logged in', user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
