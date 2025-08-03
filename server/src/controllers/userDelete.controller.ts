import { Request, Response } from 'express';
import pool from '../config/db.js';

export async function deleteUsers(req: Request, res: Response) {
  const { userIds } = req.body;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ error: 'userIds array is required' });
  }

  try {
    const query = `
      DELETE FROM users
      WHERE id = ANY($1::int[])
      RETURNING id, name, email
    `;
    const result = await pool.query(query, [userIds]);

    res.status(200).json({
      message: 'Users deleted successfully',
      deletedUsers: result.rows
    });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ error: 'Failed to delete users' });
  }
}
