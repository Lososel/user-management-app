import pool from '../config/db.ts';
import bcrypt from 'bcrypt';
import { LoginCredentials } from '../types/user.ts';

export async function loginUser({ email, password }: LoginCredentials) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  const user = result.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return { id: user.id, name: user.name, email: user.email };
}
