import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes);

// 404 for non-existing endpoints
app.use((req, res) => {
  res.status(404).send({ message: 'Endpoint not found' });
});

// 500 Internal Server Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).send({ message: 'Server error occurred' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
