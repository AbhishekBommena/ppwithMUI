import './App.css';
import Form from './components/Form';
import ReceiverForm from "./components/ReceiverForm"
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Transfer from "./components/Transfer"
import Grid from "@mui/material/Grid"

function App() {
  const [customer, setCustomer] = useState(null)
  const [receiver, setReceiver] = useState(null)
  const [showTransfer, setShowTransfer] = useState(null)
  const [hideCustReceiver, setHideCustReceiver] = useState(true)
  function receiveCustomerData(selectedCustomer) {
    setCustomer(selectedCustomer)
  }
  function receiveReceiverData(selectedReceiver) {
    setReceiver(selectedReceiver)
  }
  function handleNext() {
    if (Object.keys(customer).length !== 0 && Object.keys(receiver).length !== 0) {
      console.log("cust" + customer.id)
      console.log("rec" + receiver.id)
      console.log("welocme")
      setShowTransfer(true)
      setHideCustReceiver(false)
    }
  }
  const handleBack = () => {
    setShowTransfer(false)
    setHideCustReceiver(true)
  }
  return (
    <>
      <div className="App">
        <Container maxWidth="sm | md" className='main-container' sx={{ p: "3rem" }}>
          {hideCustReceiver && <Form receiveCustomerData={receiveCustomerData} />} <br />
          {hideCustReceiver && <ReceiverForm receiveReceiverData={receiveReceiverData} />}
          {hideCustReceiver && <Button variant="contained" size="large" endIcon={<NavigateNextIcon />} onClick={handleNext}>
            Next
          </Button>}
          {showTransfer && <Transfer {...customer} />}
          <Grid container className='grid-content'>
            <Grid item xs={6} className="grid-item" >

              {showTransfer && <Button variant="contained" size="large" startIcon={<ArrowBackIosNewIcon />} onClick={handleBack}>
                Back
              </Button>}
            </Grid>
            <Grid item xs={6} className="grid-item" >

              {showTransfer && <Button variant="contained" size="large" endIcon={<SendIcon />}>
                Transfer
              </Button>}
            </Grid>
            </Grid>
        </Container>
      </div>
    </>
  );
}

export default App;
