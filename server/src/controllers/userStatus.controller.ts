import { Request, Response } from 'express';
import pool from '../config/db.js';

export async function updateUserStatus(req: Request, res: Response) {
  const { userIds, status } = req.body;

  if (!Array.isArray(userIds) || !status) {
    return res.status(400).json({ error: 'userIds array and status are required' });
  }

  try {
    const query = `
      UPDATE users
      SET status = $1
      WHERE id = ANY($2::int[])
      RETURNING id, name, email, status
    `;
    const result = await pool.query(query, [status, userIds]);

    res.status(200).json({
      message: `Users updated to status: ${status}`,
      users: result.rows,
    });
  } catch {
    res.status(500).json({ error: 'Failed to update user status' });
  }
}
