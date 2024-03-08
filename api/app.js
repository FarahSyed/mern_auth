import express from "express";
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'

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
  
  app.use('/api/user', userRoutes);


app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`);
});