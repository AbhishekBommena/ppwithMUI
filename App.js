import './App.css';
import Form from './components/Form';
import ReceiverForm from "./components/ReceiverForm"
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Transfer from "./components/Transfer"
function App() {
  const [customer, setCustomer] = useState("")
  const [receiver, setReceiver] = useState("")
  const [showTransfer,setShowTransfer] = useState(false)
  function receiveCustomerData(selectedCustomer) {
    setCustomer(selectedCustomer)
  }
  function receiveReceiverData(selectedReceiver) {
    setReceiver(selectedReceiver)
  }
  function handleNext() {
    if (customer !== "" && receiver !== "") {
      console.log("welocme")
      setShowTransfer(true)
    }
  }
  return (
    <Container maxWidth="sm | md" className='main-container' sx={{ p:"3rem"}}>
      <div className="App">
        <Form receiveCustomerData={receiveCustomerData} />
        <ReceiverForm receiveReceiverData={receiveReceiverData} />
        <Button variant="contained" size="large" endIcon={<NavigateNextIcon />} onClick={handleNext}>
          Next
        </Button>
        { showTransfer && <Transfer/> }
      </div>
    </Container>

  );
}

export default App;
