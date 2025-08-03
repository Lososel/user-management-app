import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import { generateToken } from '../utils/jwt.js';

interface LoginInput {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginInput) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  if (user.status === 'blocked') {
    throw new Error('Your account is blocked. Contact admin.');
  }

  await validatePassword(password, user.password);

  await updateLastLogin(user.id);

  const token = generateToken({ id: user.id });

  return { id: user.id, name: user.name, email: user.email, token };
}

async function findUserByEmail(email: string) {
  const result = await pool.query(
    `SELECT id, name, email, password, status FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}

async function validatePassword(inputPassword: string, hash: string) {
  const isValid = await bcrypt.compare(inputPassword, hash);
  if (!isValid) throw new Error('Invalid email or password');
}

async function updateLastLogin(userId: number) {
  await pool.query(`UPDATE users SET last_login = NOW() WHERE id = $1`, [userId]);
}
