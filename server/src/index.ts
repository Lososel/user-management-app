import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to DB at:', result.rows[0].now);
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Server listening on http://localhost:${PORT}`);
});
