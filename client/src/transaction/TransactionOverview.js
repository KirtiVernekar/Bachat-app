import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Divider, Grid, Card, CardContent } from '@material-ui/core'
import {Link} from 'react-router-dom'
import auth from '../auth/auth-helper'
import {currentMonthPreview, transactionByCategory} from './api-transaction'
import FabButton from '../components/FabButton'
import TransactionCategoryTable from '../components/TransactionCategoryTable'
import { VictoryPie, VictoryTheme, VictoryLabel} from "victory"

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: '#A8C6FF',
    //#FFF823 #A8C6FF
    minWidth: '1080px',
    minHeight: '400px',
    boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
    display:'flex', 
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '30px auto'
  },
  data: {
    padding: '8px 6px',
    fontSize: '2.5em',
    margin: '5px',
    color: '#3300A6',
    textAlign: 'center',
    fontWeight: 'medium'
  },
  text: {
    color: '#3300A6',
    textAlign:'center', 
    padding: '20px 2px', 
    fontWeight: 'bold'
  },
  day: {
    color: '#3300A6',
    textAlign:'center',
    // fontWeight: 'medium',
    padding: '20px 5px 0 0'
  },
  align: {
    display:'flex', 
    flexDirection: 'column',
    justifyContent:'center', 
    alignItems:'center',
  },
  
  alignCard: {
    display:'flex', 
    flexDirection: 'row', 
    justifyContent:'center', 
    alignItems:'center',
    margin: '5px 5px',
    border: '4px solid #E8E8E8',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  table: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}))

export default function TransactionOverview() {
  const classes = useStyles()
  const [expensesPreview, setExpensesPreview] = useState({month:0, today:0, yesterday:0})
  const [savingsPreview, setSavingsPreview] = useState({month:0, today:0, yesterday:0})
  const defaultGraphicData = [{ x: 'Expenses', y: 0 }, { x: 'Savings', y: 100 }];
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const jwt = auth.isAuthenticated()
      
  const wantedGraphicData = [{ x: 'Expenses', y: 70 }, { x: 'Savings', y: 30 }];

  useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
      currentMonthPreview({type: 'expenses'}, {t: jwt.token}, signal).then((data) => {
        if (data.error) {
          setRedirectToSignin(true)
        } else {
          setExpensesPreview(data)
        }
      })

      currentMonthPreview({type: 'savings'}, {t: jwt.token}, signal).then((data) => {
        if (data.error) {
          setRedirectToSignin(true)
        } else {
          setSavingsPreview(data)
        }
      })

      setGraphicData(wantedGraphicData);

      return function cleanup(){
        abortController.abort()
      }
  }, [])


  return (
    <div>
      <Grid container spacing={2} className={classes.table}>
      <Card className={classes.card}>
      <Grid item xs={4}>
      <div style={{width: 420, margin: 'auto'}}>
          <svg viewBox="0 0 420 420" >           
            <VictoryPie standalone={false} 
                //data={[{ x: 'Expenses', y: expensesPreview.month.total }, { x: 'Savings', y: savingsPreview.month.total }]} 
                data={graphicData}
                width={420} height={420} innerRadius={80} 
                //theme={VictoryTheme.material} 
                colorScale={['#3300A6', '#FFF823']}
                animate={{ onLoad: { duration: 5000, easing: 'exp'} }}
                labelRadius={({ innerRadius }) => innerRadius + 12 }
                labelComponent={ <VictoryLabel angle={0} style={[{
                    fontSize: '18px',
                    fill: '#33FFA6'
                  },
                  {
                      fontSize: '18px',
                      fill: '#3300A6'
                  }]}
                  //text={( {datum} ) => `${datum.x}\n ${datum.y}`}
                  /> } 
                      
            />
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 20, fill: '#3300A6' }}
              x={210} y={210}
              text={`Your pattern`}
            />
          </svg>
        </div>
      </Grid>
      <Grid item container className={classes.align} style={{width: 500}}>
        <Typography variant="h6" className={classes.text}>THIS MONTH</Typography>    
        <Card className={classes.alignCard}>
          <Typography component="span" className={classes.data}><span style={{display: 'block', fontSize:'0.3em', fontWeight:'bold'}}>SPENT</span>₹{expensesPreview.month ? expensesPreview.month.total : '0'}</Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography component="span" className={classes.data}><span style={{display: 'block', fontSize:'0.3em', fontWeight:'bold'}}>SAVED</span>₹{savingsPreview.month ? savingsPreview.month.total: '0'}</Typography>
        </Card>
        <Grid item style={{display: 'flex'}}>
        <div className={classes.align}>
        <Typography variant="body2" className={classes.day}>TODAY</Typography>
        <Card className={classes.alignCard}>
          <Typography component="span" className={classes.data} style={{fontSize: '1.2em'}}>₹{expensesPreview.today ? expensesPreview.today.total : '0'}</Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography component="span" className={classes.data} style={{fontSize: '1.2em'}}>₹{savingsPreview.today ? savingsPreview.today.total : '0'}</Typography>
        </Card></div>
        <div className={classes.align}>
        <Typography variant="body2" className={classes.day}>YESTERDAY</Typography>
        <Card className={classes.alignCard}>
          <Typography component="span" className={classes.data} style={{fontSize: '1.2em'}}>₹{expensesPreview.yesterday ? expensesPreview.yesterday.total : '0'}</Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography component="span" className={classes.data} style={{fontSize: '1.2em'}}>₹{savingsPreview.yesterday ? savingsPreview.yesterday.total : '0'}</Typography>
        </Card></div>
        </Grid>
        <Link to="/tranactions/all"><Typography variant="body1" style={{padding: '10px 0'}}>See All</Typography></Link> 
      </Grid>
      
      </Card>
      </Grid>
  
      <Grid container className={classes.align}>
        <Grid item ><TransactionCategoryTable type="Expenses"/></Grid>
        <Grid item ><TransactionCategoryTable type="Savings"/></Grid>
      </Grid>
      <FabButton />
    </div> 
  )
}
