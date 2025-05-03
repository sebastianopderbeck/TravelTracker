import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import travelRoutes from './routes/travelRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config', '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', travelRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/travel-tracker", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 