import { Request, Response } from 'express';
import { registerUser } from '../services/register.service.ts';

export async function handleRegister(req: Request, res: Response) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
