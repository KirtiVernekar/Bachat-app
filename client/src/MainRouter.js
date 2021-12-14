import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Reports from './reports/Reports'
import MenuBar from './pages/MenuBar'
import NewTransaction from './transaction/NewTransaction'
import Transactions from './transaction/Transactions'
import { GlobalProvider } from './context/GlobalState'

const MainRouter = () => {
    return ( 
    <div>
      <GlobalProvider>
      <MenuBar/>
      {/* <Switch>
        <PrivateRoute path="/expenses/all" component={Expenses}/>
        <PrivateRoute path="/expenses/new" component={NewExpense}/>
        <PrivateRoute path="/expenses/reports" component={Reports}/>
      </Switch> */}
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={ EditProfile }/>
        <Route path="/user/:userId" component={ Profile }/>
        <PrivateRoute path="/transactions/all" component={Transactions}/>
        <PrivateRoute path="/transactions/new" component={NewTransaction}/>
        <PrivateRoute exact path="/reports/:type" component={Reports}/>
      </Switch>
      </GlobalProvider>
    </div>
   )
}

export default MainRouter;