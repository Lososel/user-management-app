import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import pool from '../config/db.js';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token) as { id: number };
    const result = await pool.query(
      `SELECT id, status FROM users WHERE id = $1`,
      [decoded.id]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.status === 'blocked') {
      return res.status(403).json({ error: 'Your account is blocked' });
    }

    req.user = { id: user.id };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}
