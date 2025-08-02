import { Request, Response } from 'express';
import pool from '../config/db.ts';

export async function unblockUsers(req: Request, res: Response) {
  const { userIds } = req.body;
  await pool.query(
    `UPDATE users SET status = 'active' WHERE id = ANY($1::int[])`,
    [userIds]
  );
  res.json({ message: 'Users unblocked successfully' });
}