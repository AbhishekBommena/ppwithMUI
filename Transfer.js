import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { useState,useEffect } from 'react';

function Transfer(props) {

    const [errorHandler, setErrorHandler] = useState(false)
    const [transferType, setTransferType] = useState('');
    const [messageCode, setMessageCode] = useState("")
    const [amountToBeTransfered, setAmountToBeTransfered] = useState("")
    const [transferFee, setTransferFee] = useState(0);
    const [afterTransferClearBalance, setAfterTransferClearBalance] = useState(0)
    const [amountExceedingErr, setAmountExceedingErr] = useState("")

    const handleTransferType = (event) => {
        setTransferType(event.target.value);
    };
    const handleMessageCode = (event) => {
        setMessageCode(event.target.value);
    };

    useEffect( () => {
        setAmountToBeTransfered("")
    },[props])
    useEffect(()=>{
        if( props.overdraft === "yes"){
            setTransferFee((amountToBeTransfered*0.25)/100)
            setAfterTransferClearBalance( parseFloat(props.clearBalance)-(parseFloat(amountToBeTransfered)+parseFloat(transferFee)).toString())
        }
        else{
            if( amountToBeTransfered > props.clearBalance){
                setErrorHandler(true)
                setAmountExceedingErr("Insufficient Balance")
            }
            else{
                setTransferFee((amountToBeTransfered*0.25)/100)
                setAfterTransferClearBalance( parseFloat(props.clearBalance)-(parseFloat(amountToBeTransfered)+parseFloat(transferFee)))
                setAmountExceedingErr("")
            }
        }        
    },[amountToBeTransfered])
    return (
        <>
            <Grid container rowSpacing={3} className='grid-content'>
                <Grid item xs={12} md={6} className="grid-item">
                    <TextField
                        className='inputField'
                        id="outlined-select-currency"
                        select
                        label="Transfer Type"
                        value={transferType}
                        onChange={handleTransferType}
                        variant="filled"
                    // helperText="Please select your currency"
                    >
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="Bank">Bank</MenuItem>
                    </TextField>

                </Grid>
                <Grid item xs={12} md={6} className="grid-item">
                    <TextField
                        className='inputField'
                        id="outlined-select-currency"
                        select
                        label="Message Code"
                        value={messageCode}
                        onChange={handleMessageCode}
                        variant="filled"
                    // helperText="Please select your currency"
                    >
                        <MenuItem value="customer">CHQB</MenuItem>
                        <MenuItem value="CORT">CORT</MenuItem>
                        <MenuItem value="HOLD">HOLD</MenuItem>
                        <MenuItem value="INTC">INTC</MenuItem>
                        <MenuItem value="PHOB">PHOB</MenuItem>
                        <MenuItem value="PHOI">PHOI</MenuItem>
                        <MenuItem value="PHON">PHON</MenuItem>
                        <MenuItem value="REPA">REPA</MenuItem>
                        <MenuItem value="SDVA">SDVA</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6} className="grid-item">
                    <TextField
                        label="Amount"
                        variant="filled"
                        className="inputField"
                        error={errorHandler}
                        helperText={amountExceedingErr}
                        value={amountToBeTransfered}
                        onChange={(event) => { setAmountToBeTransfered(event.target.value) }}
                    />
                </Grid>
                <Grid item xs={12} md={6} className="grid-item">
                    <TextField
                        InputProps={{
                            readOnly:true
                        }}
                        label="Transfer Fee"
                        variant="filled"
                        className="inputField"
                        value={transferFee}
                    />
                </Grid>
                <Grid item xs={12} md={6} className="grid-item">
                    <TextField
                        InputProps={{
                            readOnly:true
                        }}
                        label="Clear Balance"
                        variant="filled"
                        className="inputField"
                        value={afterTransferClearBalance}
                    />
                </Grid>
            </Grid>
        </>
    )
}
export default Transfer;