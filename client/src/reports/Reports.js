import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import CategoryPie from './CategoryPie'
import YearlyBar from './YearlyBar'
import MonthlyScatter from './MonthlyScatter'
import { useParams } from 'react-router'

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    maxWidth: '800px',
    margin: 'auto',
    marginTop: 40,
    marginBottom: 40
  },
  separator: {
      marginBottom: 36
  }
}))

const Reports = () => {
    const classes = useStyles()
    const { type } = useParams();
    
    return (
        <div className={classes.root}>
            <MonthlyScatter transactionType={type}/> 
            <Divider className={classes.separator}/>
            <YearlyBar transactionType={type}/>
            <Divider className={classes.separator}/>
            <CategoryPie transactionType={type}/>
        </div>
    )
}

export default Reports;