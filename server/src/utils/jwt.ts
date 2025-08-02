import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET as string;

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): { id: number; iat: number; exp: number } {
  return jwt.verify(token, SECRET) as { id: number; iat: number; exp: number };
}
