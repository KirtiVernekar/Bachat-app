import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import Template from './../template'

const CURRENT_WORKING_DIR = process.cwd();

const app = express();
/*... configure express ... */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
  
app.get('/', (req, res) => {
    res.status(200).send(Template());
   })

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

export default app;