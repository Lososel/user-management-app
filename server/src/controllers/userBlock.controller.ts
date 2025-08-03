import { Request, Response } from 'express';
import pool from '../config/db.js';

export async function blockUsers(req: Request, res: Response) {
  const { userIds } = req.body;
  await pool.query(`
    UPDATE users 
    SET status = 'blocked' 
    WHERE id = ANY($1::int[])
    `,
    [userIds]
  );
  res.json({ message: 'Users blocked successfully' });
}
