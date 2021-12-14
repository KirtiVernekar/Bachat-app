import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import auth from '../auth/auth-helper'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"
import { yearlyTransactions } from './../transaction/api-transaction'
import { VictoryTheme, VictoryAxis, VictoryBar, VictoryChart } from "victory"


const useStyles = makeStyles(theme => ({
  title: {
    padding:`32px ${theme.spacing(2.5)}px 2px`,
    color: '#2bbd7e',
    display:'inline'
  }
}))


const YearlyBar = ({transactionType}) => {
    const classes = useStyles()
    const [error, setError] = useState('')
    const [year, setYear] = useState(new Date())
    const [yearlyTransaction, setYearlyTransaction] = useState([])
    const jwt = auth.isAuthenticated()
    const monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        yearlyTransactions({year: year.getFullYear(), type: transactionType },{t: jwt.token}, signal).then((data) => {
          if (data.error) {
            setError(data.error)
          }
            setYearlyTransaction(data)
        })
        return function cleanup(){
          abortController.abort()
        }
    }, [])

    const handleDateChange = date => {
        setYear(date)
        yearlyTransactions({year: date.getFullYear(), type: transactionType},{t: jwt.token}).then((data) => {
          if (data.error) {
            setError(data.error)
          }
            setYearlyTransaction(data)
        })
    }
   
    return (
      <div>
          <Typography variant="h6" className={classes.title}>Monthly distribution of your {transactionType} in</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={year} onChange={handleDateChange} views={["year"]}
                disableFuture
                label="Year"
                animateYearScrolling
                variant="inline"/>
          </MuiPickersUtilsProvider>
          <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                height={300}
                width={450}>
                <VictoryAxis/>
                <VictoryBar
                    categories={{
                        x: monthStrings
                    }}
                    style={{ data: { fill: "#69f0ae", width: 20 }, labels: {fill: "#01579b"} }}
                    data={yearlyTransaction.monthTotal}
                    x={monthStrings['x']}
                    domain={{x: [0, 13]}}
                    labels={({ datum }) => `$${datum.y}`}
                />
          </VictoryChart>
      </div>
    )
  }

export default YearlyBar