import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './template'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import transactionRoutes from './routes/transaction.routes'

// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/src/MainRouter'
import { StaticRouter } from 'react-router-dom'

import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import theme from './../client/src/theme'
//end

//comment out before building for production
import devBundle from './devBundle'

//creates an express app
const app = express();

//comment out before building for production
devBundle.compile(app);

/*... configure express ... */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// mount routes  - api inpoint routes so that server can perform crud ops
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', transactionRoutes);

//serves static files from the dist folder
const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

//server side rendering
app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
          <StaticRouter location={req.url} context={context}>
            <ThemeProvider theme={theme}>
              <MainRouter />
            </ThemeProvider>
          </StaticRouter>
        )
    );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  res.status(200).send(Template({
    markup: markup,
    css: css
  }));
})

//app.get('/', (req, res) => { res.status(200).send(Template()); })
//app.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../client/public/index.html")));

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message});
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message});
    console.log(err);
  }
})
  

export default app;