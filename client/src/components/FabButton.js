import React, {useState, useContext, useEffect} from 'react'
import { Box, Fab, Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GlobalContext } from '../context/GlobalState'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}))

export default function FabButton() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {setTransactionType} = useContext(GlobalContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  //setState hets called infinitely if useEffect is not used here. Usage calls it twice
  // const handleClickButton = (transactionType) => {
  //   useEffect(() => {
  //     setTransactionType(transactionType)
  //     console.log(transactionType)
  //   }, []);
  // }

  const handleClickExpense = () => {
    setTransactionType('Expenses')
  }
  const handleClickSaving = () => {
    setTransactionType('Savings')
  }

  return (
  <>
    <Fab variant="extended" className={classes.fab} color="primary" aria-label="add" onClick={handleClickOpen}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18, fontWeight: "bold" }}><Add />ADD</Box>
    </Fab>
    <Dialog
      open={open}
      onClick={handleClose}
      aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">
        {"What transaction would you like to add?"}
      </DialogTitle>
      <Box component="div" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', p: 2 }}>
        {/* <Link to="/transactions/new"><Button variant="contained" color="primary" onClick={handleClickButton('Expense')}>Expense</Button></Link> */}
        {/* <Link to="/transactions/new"><Button variant="contained" color="primary" onClick={handleClickButton('Saving')}>Saving</Button></Link> */}
        {/* <Button component={Link} to={process.env.PUBLIC_URL + "/Example"}>Example</Button> */}
        <Link to="/transactions/new"><Button variant="contained" color="primary" onClick={handleClickExpense}>Expense</Button></Link>
        <Link to="/transactions/new"><Button variant="contained" color="primary" onClick={handleClickSaving}>Saving</Button></Link>
      </Box>
    </Dialog>
  </>
)}

