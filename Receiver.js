import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import "../css/Form.css"
function Receiver(props) {
    const receiverDetails = props.receiverDetails
    const [acctHolderName,setAcctHolderName] = useState("")
    const [acctHolderNumber,setAcctHolderNumber] = useState("")

    const handleAcctHolderName = (event) => {
        event.preventDefault()
        setAcctHolderName(event.target.value)
    }
    const handleAcctHolderNumber = (event) => {
        event.preventDefault()
        setAcctHolderNumber(event.target.value)
    }
    return (
        <>
            <Grid item xs={12} md={6} className="grid-item">
                <TextField  id="filled-read-only-input"
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Institute Name"
                    variant="filled"
                    className="inputField"
                    value={receiverDetails?.instituteName ?? ""} 
                    />
            </Grid>
            <Grid item xs={12} md={6} className="grid-item">
                <TextField 
                    required
                    id="filled-read-only-input"
                    className="inputField"
                    label="Account Holder Name"
                    variant="filled"
                    value={acctHolderName}
                    onChange={handleAcctHolderName}
                />
            </Grid>
            <Grid item xs={12} md={6} className="grid-item">
                <TextField
                    required
                    className="inputField"
                    id="filled-read-only-input"
                    label="Account Holder Number"
                    variant="filled"
                    value={acctHolderNumber}
                    onChange={handleAcctHolderNumber}
                    />
            </Grid>
        </>
    )
}
export default Receiver;