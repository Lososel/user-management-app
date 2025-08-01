import { Request, Response } from 'express';
import pool from '../config/db.ts';

export async function getAllUsers(req: Request, res: Response) {
  try {
    const result = await pool.query(
      'SELECT id, name, email, status, last_login FROM users ORDER BY last_login DESC NULLS LAST'
    );
    res.status(200).json({ users: result.rows });
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
