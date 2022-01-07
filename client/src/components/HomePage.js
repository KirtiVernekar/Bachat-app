import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button, Grid } from '@material-ui/core'
import auth from '../auth/auth-helper'
import TransactionOverview from '../transaction/TransactionOverview'
import SavingsPiggy from '../../assets/SavingsPiggy.svg'


const useStyles = makeStyles(theme => ({
  container: {
    padding:`3rem 5rem`,
    height: '100%',
    // justifyContent: 'space-around',
    placeItems: 'center',
    ['@media (max-width:780px)']: { 
      padding:`2rem 1rem`,
      fontSize: '0.7rem'
    }
  },
  title: {
    ['@media (max-width:420px)']: { 
      fontSize: '1.5rem'
    }
  },
  info:{
    padding: `0 2rem`
  },
  svgContainer: {
    
  },
  svg: {
    height: '100%',
    width: '100%',
    ['@media (max-width:780px)']: { 
      margin:`2rem 0`,
    }
  },

}))

export default function Home(){
  const classes = useStyles()
  return (
    <>
      { auth.isAuthenticated() && 
        <TransactionOverview/> 
      } 
      { !auth.isAuthenticated() && typeof window !== "undefined" && 
        (<Grid container className={classes.container}>
              <Grid item sm={12} md={6} container direction="column" spacing={3} className={classes.info}>
                  <Grid item>
                    <Typography variant="h4" className={classes.title}>
                      Wanna keep track of your day-to-day expenses and savings at one place?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      Bachat app uses transaction records for extracting meaningful data patterns to give you a visual representation of your expense and saving habits.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" component={Link} to="/signup">SIGN UP</Button>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" className={classes.svgContainer}>
                      <span>Already have an account?  </span>
                      <Link to="/signin">Sign In</Link>
                    </Typography>
                  </Grid>
              </Grid>
              <Grid item sm={12} md={6} className={classes.svgContainer}>
                <img className={classes.svg} src={SavingsPiggy}/>
              </Grid>
          </Grid> )
      }
    </>
  )
}