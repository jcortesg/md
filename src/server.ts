import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import session from 'express-session';
import { MainRouter } from './routes/index';
import { loadErrorHandlers } from './utilities/error-handling';
import dotenv from 'dotenv';
import { SESSION_SECRET } from "./utilities/secrets";

import './utilities/passport'
import './database';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', MainRouter);

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
