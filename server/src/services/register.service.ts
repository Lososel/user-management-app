import bcrypt from 'bcrypt';
import pool from '../config/db.ts';
import { NewUser } from '../types/user.ts';

export async function registerUser({ name, email, password }: NewUser) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );
  return result.rows[0];
}
