import express, { Application } from 'express';
import path from 'path';
import * as bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import { MainRouter } from './routes/index';
import { loadErrorHandlers } from './utilities/error-handling';
import dotenv from 'dotenv';
import { SESSION_SECRET } from "./utilities/secrets";

import './utilities/passport'
import './database';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client-md/dist')));
app.use(bodyParser.json());
app.use('/api', MainRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-md/dist/', 'index.html'));
});


app.use(session({
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}
));

loadErrorHandlers(app);

app
  .listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  })
  .on('error', (err) => console.log(err));
