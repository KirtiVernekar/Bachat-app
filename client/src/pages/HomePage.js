import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Media, Typography, Button, Grid } from '@material-ui/core'
import auth from '../auth/auth-helper'
import TransactionOverview from './../transaction/TransactionOverview'
import SavingsPiggy from '../../assets/SavingsPiggy.svg'
import  styles from './HomePage.module.css'

export default function Home(){
  return (
    <>
      { auth.isAuthenticated() && 
        <TransactionOverview/> 
      } 
      { !auth.isAuthenticated() && typeof window !== "undefined" && 
        (<div>
            <Grid container className={styles.container}>
                <Grid item xs={6} container direction="column" spacing={3}>
                    <Grid item>
                      <Typography variant="h4" className={styles.title}>
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
                      <Typography variant="body2">
                        <span>Already have an account?  </span>
                        <Link to="/signin">Sign In</Link>
                      </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <img className={styles.image} src={SavingsPiggy}/>
                </Grid>
            </Grid> 
        </div>)
      }
    </>
  )
}