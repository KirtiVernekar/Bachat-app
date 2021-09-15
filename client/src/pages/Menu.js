import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import auth from './../auth/auth-helper'
import { Link, withRouter } from 'react-router-dom'
import { AppBar, Box, Button, Toolbar, Typography, Tab } from '@material-ui/core'

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#4CC9F0', fontSize: '1.1rem'}
  else
    return {color: '#ffffff'}
}
const Menu = withRouter(({history}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h5" color="inherit">Bachat App
        {/* <Box fontWeight="fontWeightBold">Bachat App</Box> */}
      </Typography>
      <Link to="/">
        <Button style={isActive(history, "/")}>Home</Button>
      </Link>
      
      <Link to="/users">
        <Button style={isActive(history, "/users")}>Users</Button>
      </Link>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign Up</Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In</Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          <Link to={ "/user/" + auth.isAuthenticated().user._id }>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
                auth.clearJWT(() => history.push('/'))
              }}>Sign out</Button>
         
        </span>)
      }
    </Toolbar>
  </AppBar>
))

export default Menu