import { Request, Response } from 'express';
import { registerUser } from '../services/register.service.js';
import { PostgresError } from '../types/db.js';

export async function handleRegister(req: Request, res: Response) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered', ...user });
  } catch (error: unknown) {
    const dbError = error as PostgresError;
    if (dbError.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: dbError.message || 'Unknown error' });
  }
}
