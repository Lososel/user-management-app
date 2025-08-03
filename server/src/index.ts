import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const allowedOrigins = [
  'https://user-app-elmira.netlify.app',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body || {});
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is up and running on Render');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
