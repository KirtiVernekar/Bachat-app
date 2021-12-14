import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Divider } from '@material-ui/core'
import auth from '../auth/auth-helper'
import { transactionByCategory } from '../transaction/api-transaction'
import { VictoryTheme, VictoryAxis, VictoryBar, VictoryGroup, VictoryChart } from "victory"
import theme from '../theme'

const useStyles = makeStyles(theme => ({
  title2: {
    padding:`32px ${theme.spacing(2.5)}px 2px`,
    color: '#2bbd7e'
  },
  categorySection: {
    padding: 25,
    paddingTop: 16,
    margin: 'auto'
  },
  catDiv: {
    height: '4px',
    margin: '0',
    marginBottom: 8
  },
  val: {
    width: 200,
    display: 'inline-table',
    textAlign: 'center',
    margin: 2
  },
  catTitle: {
    display: 'inline-block',
    padding: 10,
    backgroundColor: '#f4f6f9'
  },
  catHeading: {
    color: '#6b6b6b',
    fontSize: '1.15em',
    backgroundColor: '#f7f7f7',
    padding: '4px 0'
  },
}))

const TransactionCategoryTable = ({type}) => {
  const classes = useStyles()
  const [transactionCategories, setTransactionCategories] = useState([])
  const jwt = auth.isAuthenticated()
  const transactionType = type.toLowerCase()


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    transactionByCategory({type: transactionType}, {t: jwt.token}, signal).then((data) => {
      if (data.error) {
        setRedirectToSignin(true)
      } else {
        setTransactionCategories(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const indicateTransaction = (values) => {
    let color = '#4f83cc'
    if(values.total){
      const diff = values.total-values.average
      if( diff > 0){
        color = '#e9858b'
      }
      if( diff < 0 ){
        color = '#2bbd7e'
      } 
    }
    return color
  }

  
  const categoryNames = transactionCategories.map((transaction) => transaction._id)
  const pastMonthAvg = transactionCategories.map((transaction) => {
          let x = transaction._id;
          let y = transaction.mergedValues.average ? transaction.mergedValues.average : 0;
          return {x,y}
  })
  const currentTotal = transactionCategories.map((transaction) => {
          let x = transaction._id;
          let y = transaction.mergedValues.total ? transaction.mergedValues.total : 0;
          return {x,y}
  })

 
  return (
    <div>
        <Typography variant="h6" className={classes.title2} color="textPrimary" style={{textAlign:'center'}}>{type}</Typography>
        {/* <div className={classes.categorySection}>
          {transactionCategories.map((transaction, index) => {
            return(<div key={index} style={{display: 'grid', justifyContent: 'center'}}> 
            <Typography variant="h5" className={classes.catTitle} >{transaction._id}</Typography>
            <Divider className={classes.catDiv} style={{ backgroundColor: indicateTransaction(transaction.mergedValues)}}/>
            <div>
            <Typography component="span" className={`${classes.catHeading} ${classes.val}`}>past average</Typography>
            <Typography component="span" className={`${classes.catHeading} ${classes.val}`}>this month</Typography>
            <Typography component="span" className={`${classes.catHeading} ${classes.val}`}>{transaction.mergedValues.total && transaction.mergedValues.total-transaction.mergedValues.average > 0 ? "spent extra" : "saved"}</Typography>
            </div>
            <div style={{marginBottom: 3}}>
            <Typography component="span" className={classes.val} style={{color:'#595555', fontSize:'1.15em'}}>₹{transaction.mergedValues.average}</Typography>
            <Typography component="span" className={classes.val} style={{color:'#002f6c', fontSize:'1.6em', backgroundColor: '#eafff5', padding: '8px 0'}}>₹{transaction.mergedValues.total? transaction.mergedValues.total : 0}</Typography>
            <Typography component="span" className={classes.val} style={{color:'#484646', fontSize:'1.25em'}}>₹{transaction.mergedValues.total? Math.abs(transaction.mergedValues.total-transaction.mergedValues.average) : transaction.mergedValues.average}</Typography>
            </div>
            <Divider style={{marginBottom:10}}/>
            </div>) 
          })}
        </div> */}

        <VictoryChart horizontal
            //theme={VictoryTheme.material}
            domainPadding={10}
            height={400}
            width={500}>
            <VictoryAxis 
                  label="Categories" 
                  //offsetY={60} 
                  //tickValues={categoryNames} 
                  style={{
                    axis: {stroke: "#756f6a"},
                    axisLabel: {fontSize: 20, fontWeight: 'bold', padding: 50},
                    tickLabels: {fontSize: 15, padding: 10}
                  }}
            />
            <VictoryGroup 
                offset={20}
                //colorScale={"qualitative"}
                // categories={{
                //     x: categoryNames,
                // }}
                // domain={{x: [0, categoryNames.length+1]}}
              >
                <VictoryBar horizontal
                    style={{ data: { fill: "#5A69ED", width: 20 }, labels: {fill: "#000000"} }}
                    data={pastMonthAvg}
                    domain={{x: [0, categoryNames.length+1]}}
                    labels={({ datum }) => `$${datum.y}`}
                />
                <VictoryBar horizontal
                  style={{ data: { fill: "#A3ABF0", width: 20 }, labels: {fill: "#000000"} }}
                  data={currentTotal}
                  domain={{x: [0, categoryNames.length+1]}}
                  labels={({ datum }) => `$${datum.y}`}
                /> 
            </VictoryGroup>
          </VictoryChart>
    </div> 
  )
}

export default TransactionCategoryTable