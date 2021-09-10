import React from 'react';
import MainRouter from './MainRouter'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

import './App.css';
import { hot } from 'react-hot-loader';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>  {/* provides access to the Material-UI theme */}
        <MainRouter/>
        <div className="App">
          <h2>Expense tracker</h2>
        </div>
      </ThemeProvider>
    </BrowserRouter>
)}

export default hot(module)(App); //App React component is hot-exported to enable hot reloading with react-hot-loader during development.
