import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import assetRoutes from './routes/assetRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';

dotenv.config();
await connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'API működik' });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/assignments', assignmentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Az útvonal nem található.' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`A szerver elindult: http://localhost:${port}`);
});

// server initializeed and running on specified port, ready to handle API requests.