import React, {useEffect} from 'react';
import MainRouter from './router/MainRouter'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

const App = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (    
    <BrowserRouter>
      <ThemeProvider theme={theme}>
       <MainRouter/>
      </ThemeProvider>
    </BrowserRouter>  
  )
}

export default hot(module)(App);
//for live reloading during development

// export default App;