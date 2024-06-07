import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes/index';
import { loadErrorHandlers } from './utilities/error-handling';
import dotenv from 'dotenv';
import './database';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', MainRouter);

loadErrorHandlers(app);

app
  .listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  })
  .on('error', (err) => console.log(err));
