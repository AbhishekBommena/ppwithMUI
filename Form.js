import axios from 'axios';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import "../css/Form.css"
import Customer from './Customer';

function Form(props) {
    const [customerId, setCustomerId] = useState("")
    const [custDetails, setCustDetails] = useState({})
    const [custIdNotFound, setCustIdNotFound] = useState(null)
    const [errorHandler, setErrorHandler] = useState(false)
    const dateObject = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = dateObject.getDate() + " / " + months[dateObject.getMonth()]+ " / " + dateObject.getFullYear();
    useEffect(() => {
        const lengthOfCustomerId = customerId.length
        if (lengthOfCustomerId === 5) {
            axios.get(`http://localhost:8080/Customers/${customerId}`)
                .then((res) => {
                    setCustDetails(res.data)
                    setErrorHandler(false)
                    setCustIdNotFound(null)

                })
                .catch(err => {
                    setCustDetails({})
                    setErrorHandler(true)
                    setCustIdNotFound("Customer ID Not Found")
                })
        }
        else {
            if (lengthOfCustomerId > 0) {
                setErrorHandler(true)
                setCustIdNotFound("Please enter 5 digits Customer ID")
            }
            if (lengthOfCustomerId === 0) {
                setErrorHandler(false)
                setCustIdNotFound("")
            }
            setCustDetails({})
        }
    }, [customerId])
    const handleWithCustId = (event) => {
        event.preventDefault()
        setCustomerId(event.target.value)
    }
    useEffect(() => { props.receiveCustomerData(custDetails) }, [custDetails])
    return (
        <Grid container rowSpacing={3}>
            <Grid item xs={12} md={6} className="grid-item" >
                <TextField 
                        className="inputField"
                        // helperText={custIdNotFound}
                        id="filled-basic input-with-icon-textfield"
                        label="Booking Date"
                        variant="filled"
                        value={date}
                        InputProps={{
                            readOnly: true,
                        }}
                        onChange={handleWithCustId}
                    />
            </Grid>
            <Grid item xs={12} md={6} className="grid-item" >

            </Grid>
            <Grid item xs={12} md={6} className="grid-item" >
                <TextField required
                    error={errorHandler}
                    className="inputField"
                    helperText={custIdNotFound}
                    id="filled-basic"
                    label="Customer ID"
                    variant="filled"
                    value={customerId}
                    onChange={handleWithCustId}

                />
            </Grid>
            <Customer custDetails={custDetails} />
        </Grid>
    )
}
export default Form;