import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import authRoutes from './routes/authRoutes.js';
import addressRoutes from "./routes/addressRoutes.js";


dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials if necessary
}));
// Enable CORS
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/addresses", addressRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('server is running');
});
