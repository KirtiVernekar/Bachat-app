import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { CardMedia, Typography, Button, Grid } from '@material-ui/core'
import SavingsPiggy from '../../assets/SavingsPiggy.svg'


const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: '#3A0CA3',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  media: {
    height: 500,
    width: 500,
  },
  }
))

const LandingPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container justifyContent="space-around" alignItems="center">
                <Grid container xs={5} direction="column" spacing={3}>
                    {/* <Typography variant="h5" className={classes.title}>
                    PREMIUM EXPENSE TRACKER
                    </Typography> */}
                    <Grid item>
                    <Typography variant="h3">
                    Wanna keep track of your day-to-day expenses and savings at one place?
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography variant="body1" component="p">
                    Bachat app uses transaction records to extract meaningful data patterns to give you a visual representation of your expense and saving habits.
                    </Typography>
                    </Grid>
                    <Grid item container spacing={3}>
                        <Grid item>
                        <Button variant="contained" color="primary" component={Link} to="/signup">SIGN UP</Button>
                        </Grid>
                        <Grid item>
                        <Button variant="contained" color="primary" component={Link} to="/signin">SIGN IN</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.img}>
                    <CardMedia className={classes.media} image={SavingsPiggy} title="Savings Piggy"/>
                    </div>
                </Grid>
            </Grid> 
        </div>
    )
}

export default LandingPage;