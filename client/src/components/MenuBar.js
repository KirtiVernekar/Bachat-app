import React, { useState, useContext, useEffect } from 'react';
import {AppBar, Toolbar, Tooltip, Typography, Box, Button, IconButton, Menu, MenuItem, makeStyles} from '@material-ui/core';
import { AccountCircle, Person, Home, BarChart, Assessment, CreditCard, History, Savings } from '@material-ui/icons';
//import Logout from '@material-ui/icons/Logout'
import { Link, withRouter } from 'react-router-dom';
import auth from '../auth/auth-helper'
import { GlobalContext } from '../context/GlobalState'

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",

  },
 logo: {
    flexGrow: "1",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  menuItem: {
    color: "white",
    fontSize: "1.05rem",
    margin: "0.2rem",
    padding: "0 1rem",
    height: "100%",
    "&:hover": {
      color: "#4CC9F0",
    },
    "&:focus-within": {
      color: "#4CC9F0",
    },
    // "&:active": {
    //   color: "#4CC9F0",
    //   borderBottom: "5px solid #4CC9F0",
    // },
  },
}));


const MenuBar = withRouter(({history}) => {
  const classes = useStyles();
  const {setTransactionType} = useContext(GlobalContext);
  const handleClick = (transactionType, path) => {
    setTransactionType(transactionType)
    history.push(path)
  }


  const [anchorAcc, setAnchorAcc] = useState(null);
  const accMenuOpen = Boolean(anchorAcc);
  const [anchorRep, setAnchorRep] = useState(null);
  const repMenuOpen = Boolean(anchorRep);
  const handleAccMenuOpen = (event) => {
    setAnchorAcc(event.currentTarget);
  };
  const handleRepMenuOpen = (event) => {
    setAnchorRep(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorAcc(null);
    setAnchorRep(null);
  };

  const accountMenuId = 'account-menu';
  const accountMenu = (
    <Menu
      anchorEl={anchorAcc}
      // anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      id={accountMenuId}
      keepMounted
      open={accMenuOpen}
      onClick={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        },
      }}>
        <MenuItem onClick={() => {
                  history.push("/user/" + auth.isAuthenticated().user._id)
                  }}>
          <Box sx={{mr: 1}}> <Person /></Box>
          My Profile
        </MenuItem>
        <MenuItem onClick={() => {auth.clearJWT(() => history.push('/'))}}>
          {/* <ListItemIcon>
            <Logout />
          </ListItemIcon> */}
          Logout
        </MenuItem>
    </Menu>
  );


  const reportsMenuId = 'reports-menu';
  const reportsMenu = (
    <Menu
      anchorEl={anchorRep}
      // anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      id={reportsMenuId}
      keepMounted
      open={repMenuOpen}
      onClick={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        },
      }}>
        {/* <MenuItem onClick={() => {handleClick('Expense', '/reports/expenses')}}>
          <Box sx={{mr: 1}}> <CreditCard /></Box>
          Expenses
        </MenuItem>
        <MenuItem onClick={() => {handleClick('Saving', '/reports/savings')}}>
          <Box sx={{mr: 1}}> <CreditCard /></Box>
          Savings
        </MenuItem> */}
        <MenuItem onClick={() => {history.push('/reports/expenses')}}>
          <Box sx={{mr: 1}}> <CreditCard /></Box>
          Expenses
        </MenuItem>
        <MenuItem onClick={() => {history.push('/reports/savings')}}>
          <Box sx={{mr: 1}}> <CreditCard /></Box>
          Savings
        </MenuItem>
    </Menu>
  );



  return (
    <AppBar position="sticky">
    <Toolbar>
      <Typography variant="h5" className={classes.logo}>Bachat App</Typography>
      <div className={classes.navlinks}>
      {
        auth.isAuthenticated() && (<span>
          <Tooltip title="Home"><IconButton color="inherit" className={classes.menuItem} onClick={() => history.push("/")}><Home />Home</IconButton></Tooltip>
          <Tooltip title="Transaction history"><IconButton color="inherit" className={classes.menuItem} onClick={() => history.push("/transactions/all")}><History />History</IconButton></Tooltip>
          {/* <Link to={"/expenses/reports"}>
            <Tooltip title="Reports"><Button className={classes.menuItem}><BarChart /></Button></Tooltip>
          </Link> */}
          <Tooltip title="Transaction history">
            <IconButton
              edge="end"
              aria-label="reports of current user"
              aria-controls={reportsMenuId}
              aria-haspopup="true"
              onClick={handleRepMenuOpen}
              color="inherit"
              className={classes.menuItem}>
              <BarChart />Reports
            </IconButton>
          </Tooltip>
          {reportsMenu}
          <Tooltip title="Account Info">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={accountMenuId}
              aria-haspopup="true"
              onClick={handleAccMenuOpen}
              color="inherit"
              className={classes.menuItem}>
              <AccountCircle />My Account
            </IconButton>
          </Tooltip>
          {accountMenu}
        </span>)
      }
      {
        !auth.isAuthenticated() && (<span>
          {/* <Link to="/signup">
            <Button className={classes.link}>Sign Up</Button>
          </Link> */}
          <Link to="/signin">
            <Button className={classes.link}>Sign In</Button>
          </Link>
        </span>)
      }
      </div>
    </Toolbar>
    </AppBar>
  )
})

export default MenuBar;