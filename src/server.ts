import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import './database';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app
  .listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  })
  .on('error', (err) => console.log(err));
