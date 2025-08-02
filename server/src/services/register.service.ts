import bcrypt from 'bcrypt';
import pool from '../config/db.ts';
import { NewUser } from '../types/user.ts';
import { generateToken } from '../utils/jwt.ts';

export async function registerUser({ name, email, password }: NewUser) {
  if (!password) throw new Error('Password is missing');

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (name, email, password, status, registration_time, last_login)
     VALUES ($1, $2, $3, $4, NOW(), NOW())
     RETURNING id, name, email, last_login`,
    [name, email, hashedPassword, 'active']
  );

  const user = result.rows[0];
  const token = generateToken({ id: user.id });

  return { ...user, token };
}
