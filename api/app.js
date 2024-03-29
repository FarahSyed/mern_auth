import express from "express";
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import path from 'path';

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });
  
// Middlewares
app.use(express.static(path.join(__dirname, '/client/dist')));  //
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use(express.json());  // Allow body-parser
app.use(cookieParser());  // Allow cookie-parser
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`);
});