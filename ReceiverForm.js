import axios from 'axios';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Receiver from './Receiver';

function ReceiverForm(props) {
    const [bic, setBic] = useState("")
    const [receiverDetails, setReceiverDetails] = useState({})
    const [receiverNotFound, setReceiverNotFound] = useState(null)
    const [errorHandler, setErrorHandler] = useState(false)

    useEffect(() => {
        const lengthOfBic = bic.length
        if (lengthOfBic === 11) {
            axios.get(`http://localhost:8080/receiver/${bic}`)
                .then((res) => {
                    setReceiverDetails(res.data)
                    setErrorHandler(false)
                    setReceiverNotFound(null)
                })
                .catch(err => {
                    setReceiverDetails({})
                    setErrorHandler(true)
                    setReceiverNotFound("Receiver BIC Not Found ")
                })
        }
        else {
            if (lengthOfBic > 0) {
                setErrorHandler(true)
                setReceiverNotFound("Please enter valid BIC")
            }
            if (lengthOfBic === 0) {
                setErrorHandler(false)
                setReceiverNotFound("")
            }
            setReceiverDetails({})
        }
    }, [bic])

    const handleWithreceiver = (event) => {
        event.preventDefault()
        setBic(event.target.value)
    }
    useEffect(() => { props.receiveReceiverData(receiverDetails) }, [receiverDetails])
    return (
        <Grid container className='grid-content'>
            <Grid xs={12} md={6} className="grid-item" >
                <TextField required
                    error={errorHandler}
                    className="inputField"
                    helperText={receiverNotFound}
                    id="filled-basic"
                    label="BIC"
                    variant="filled"
                    value={bic}
                    onChange={handleWithreceiver}
                />
            </Grid>
            <Receiver receiverDetails={receiverDetails} />
        </Grid>
    )
}
export default ReceiverForm;