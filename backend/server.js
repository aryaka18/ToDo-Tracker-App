import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import todosRouter from './routes/todos.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/todos', todosRouter);

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established');

    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('✗ Unable to connect to database:', error);
    process.exit(1);
  }
};

startServer();