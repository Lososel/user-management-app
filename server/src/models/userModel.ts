import pool from '../config/db.ts';

export const createUser = async (name: string, email: string, hashedPassword: string) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );

  return result.rows[0];
};
