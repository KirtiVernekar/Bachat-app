import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './pages/Menu'

const MainRouter = () => {
    return ( 
    <div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={HomePage}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={ EditProfile }/>
        <Route path="/user/:userId" component={ Profile }/>
      </Switch>
    </div>
   )
}

export default MainRouter;