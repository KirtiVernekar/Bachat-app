import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import auth from '../auth/auth-helper'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"
import { averageCategories } from '../transaction/api-transaction'
import { VictoryPie, VictoryTheme, VictoryLabel} from "victory"

const useStyles = makeStyles(theme => ({
  title: {
    padding:`16px ${theme.spacing(2.5)}px 2px`,
    color: '#2bbd7e',
    display:'inline'
  },
  search:{
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    margin:'8px 16px',
    width:240
  },
}))



const CategoryPie = ({transactionType}) => {
    const classes = useStyles()
    const [error, setError] = useState('')
    const [transactions, setTransactions] = useState([])
    const jwt = auth.isAuthenticated()
    const date = new Date(), y = date.getFullYear(), m = date.getMonth()
    const [firstDay, setFirstDay] = useState(new Date(y, m, 1))
    const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0))
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        averageCategories({firstDay: firstDay, lastDay: lastDay, type: transactionType},{t: jwt.token}, signal).then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setTransactions(data)
          }
        })
        return function cleanup(){
          abortController.abort()
        }
    }, [])
   
    const handleDateChange = name => date => {
        if(name=='firstDay'){
            setFirstDay(date)
        }else{
            setLastDay(date)
        }
    }
    const searchClicked = () => {
        averageCategories({firstDay: firstDay, lastDay: lastDay, type: transactionType},{t: jwt.token}).then((data) => {
            if (data.error) {
              setRedirectToSignin(true)
            } else {
              setTransactions(data)
            }
        })
    }
    return (
      <div>
        <div className={classes.search}>
          <Typography variant="h6" className={classes.title}>Your {transactionType} per category </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
              disableFuture
              format="dd/MM/yyyy"
              label="FROM"
              views={["year", "month", "date"]}
              value={firstDay}
              className={classes.textField}
              onChange={handleDateChange('firstDay')}
          />
          <DatePicker
              format="dd/MM/yyyy"
              label="TO"
              views={["year", "month", "date"]}
              value={lastDay}
              className={classes.textField}
              onChange={handleDateChange('lastDay')}
          />      
          </MuiPickersUtilsProvider>
          <Button variant="contained" color="secondary" onClick={searchClicked}>GO</Button>
        </div>
      
        <div style={{width: 550, margin: 'auto'}}>
          <svg viewBox="0 0 320 320">           
            <VictoryPie standalone={false} data={transactions.monthAVG} innerRadius={50} theme={VictoryTheme.material} 
                labelRadius={({ innerRadius }) => innerRadius + 14 }
                labelComponent={ <VictoryLabel angle={0} style={[{
                    fontSize: '11px',
                    fill: '#0f0f0f'
                  },
                  {
                      fontSize: '10px',
                      fill: '#013157'
                  }]}
                  text={( {datum} ) => `${datum.x}\n $${datum.y}`}/> }
            />
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 14, fill: '#8b8b8b' }}
              x={175} y={170}
              text={`Spent \nper category`}
            />
          </svg>
        </div>                
      </div>
    )
}

export default CategoryPie