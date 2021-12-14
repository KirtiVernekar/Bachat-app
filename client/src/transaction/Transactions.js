import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import auth from '../auth/auth-helper'
import {listByUser, update} from './api-transaction.js'
import DeleteTransaction from './DeleteTransaction'
import Icon from '@material-ui/core/Icon'
import {Redirect} from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"


const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    maxWidth: '800px',
    margin: 'auto',
    marginTop: 40,
    marginBottom: 40
  },
  heading: {
    fontSize: '1.5em',
    fontWeight: theme.typography.fontWeightRegular,
    
    marginTop: 12,
    marginBottom: 4
  },
  error: {
    verticalAlign: 'middle'
  },
  notes: {
    color: 'grey'
  },
  panel: {
    border: '1px solid #58bd7f',
    margin: 6
  },
  info: {
      marginRight: 32,
      width: 90
  },
  amount: {
    fontSize: '2em',
    color: '#2bbd7e',
  },
  search:{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textField: {
    margin:'8px 16px',
    width:240
  },
  buttons: {
      textAlign:'right'
  },
  status: {
      marginRight: 8
  },
  date: {
      fontSize: '1.1em',
      color: '#8b8b8b',
      marginTop: 4
  }
}))

export default function Transactions() {
    const classes = useStyles()
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')
    const [transactions, setTransactions] = useState([])
    const jwt = auth.isAuthenticated()
    const date = new Date(), y = date.getFullYear(), m = date.getMonth()
    const [firstDay, setFirstDay] = useState(new Date(y, m, 1))
    const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0))
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listByUser({firstDay: firstDay, lastDay: lastDay},{t: jwt.token}, signal).then((data) => {
          if (data.error) {
            setRedirectToSignin(true)
          } else {
            setTransactions(data)
          }
        })
        return function cleanup(){
          abortController.abort()
        }
    }, [])
    const handleSearchFieldChange = name => date => {
        if(name=='firstDay'){
            setFirstDay(date)
        }else{
            setLastDay(date)
        }
    }
    const searchClicked = () => {
        listByUser({firstDay: firstDay, lastDay: lastDay},{t: jwt.token}).then((data) => {
            if (data.error) {
              setRedirectToSignin(true)
            } else {
              setTransactions(data)
              //console.log(transactions)
            }
        })
    }
    const handleChange = (name, index) => event => {
        const updatedTransactions = [...transactions]
        updatedTransactions[index][name] = event.target.value
        setTransactions(updatedTransactions)
    }
    const handleDateChange = index => date => {
        const updatedTransactions = [...transactions]
        updatedTransactions[index].incurred_on = date
        setTransactions(updatedTransactions)
      }
    const clickUpdate = (index) => {
        let transaction = transactions[index]
        update({
          transactionId: transaction._id
          }, {
            t: jwt.token
          }, transaction).then((data) => {
            if (data.error) {
              setError(data.error)
            } else {
              setSaved(true)
              setTimeout(()=>{setSaved(false)}, 3000)
            }
        })
    }
    const removeTransaction = (transaction) => {
        const updatedTransactions = [...transactions]
        const index = updatedTransactions.indexOf(transaction)
        updatedTransactions.splice(index, 1)
        setTransactions(updatedTransactions)
    }
    
    if (redirectToSignin) {
        return <Redirect to='/signin'/>
    }
    return (
      <div className={classes.root}>
      <div className={classes.search}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    disableFuture
                    format="dd/MM/yyyy"
                    label="SHOWING RECORDS FROM"
                    className={classes.textField}
                    views={["year", "month", "date"]}
                    value={firstDay}
                    onChange={handleSearchFieldChange('firstDay')}
                />
                <DatePicker
                    format="dd/MM/yyyy"
                    label="TO"
                    className={classes.textField}
                    views={["year", "month", "date"]}
                    value={lastDay}
                    onChange={handleSearchFieldChange('lastDay')}
                />      
        </MuiPickersUtilsProvider>
        <Button variant="contained" color="secondary" onClick={searchClicked}>GO</Button>
        </div>
        
      {transactions.map((transaction, index) => {
            return   <span key={index}>
        <Accordion className={classes.panel}>
          <AccordionSummary
            expandIcon={<Edit />}
          >
            <div className={classes.info}>
                <Typography className={classes.amount}>₹ {transaction.amount}</Typography><Divider style={{marginTop: 4, marginBottom: 4}}/>
                <Typography>
                    {transaction.category}
                </Typography>
                <Typography className={classes.date}>{new Date(transaction.incurred_on).toLocaleDateString()}</Typography>  
            </div>
            <div>
                <Typography className={classes.heading}>{transaction.title}</Typography>
                <Typography className={classes.notes}>
                    {transaction.notes}
                </Typography>
            </div>
          </AccordionSummary>
          <Divider/>
          <AccordionDetails style={{display: 'block'}}>
          <div>
              <TextField label="Title" className={classes.textField} value={transaction.title} onChange={handleChange('title', index)} margin="normal"/>
             <TextField label="Amount (₹)" className={classes.textField} value={transaction.amount} onChange={handleChange('amount', index)} margin="normal" type="number"/>
          </div>
          <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    label="Incurred on"
                    className={classes.textField}
                    views={["year", "month", "date"]}
                    value={transaction.incurred_on}
                    onChange={handleDateChange(index)}
                    showTodayButton
                />
          </MuiPickersUtilsProvider>
          <TextField label="Category" className={classes.textField} value={transaction.category} onChange={handleChange('category', index)} margin="normal"/>
          </div>
          <TextField
            label="Notes"
            multiline
            rows="2"
            value={transaction.notes}
            onChange={handleChange('notes', index)}
            className={classes.textField}
            margin="normal"
          />
          <div className={classes.buttons}>
          {
            error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {error}</Typography>)
          }
          {
              saved && <Typography component="span" color="secondary" className={classes.status}>Saved</Typography>
          }
            <Button color="primary" variant="contained" onClick={()=> clickUpdate(index)} className={classes.submit}>Update</Button>
            <DeleteTransaction transaction={transaction} onRemove={removeTransaction}/>
          </div>    
          </AccordionDetails>
        </Accordion>
        </span>
        })}
      </div>
    )
  }