import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import "../css/Form.css"
function Customer(props) {

    const custDetails = props.custDetails
    return (
        <>
            <Grid xs={12} md={6} className="grid-item">
                <TextField id="filled-read-only-input"
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Account Holder Name"
                    variant="filled"
                    className="inputField"
                    value={custDetails?.acctHolderName ?? ""} />
            </Grid>
            <Grid xs={12} md={6} className="grid-item">
                <TextField
                    id="filled-read-only-input"
                    className="inputField"

                    InputProps={{
                        readOnly: true,
                    }}
                    label="Clear Balance"
                    variant="filled"
                    value={custDetails?.clearBalance ?? ""}
                />
            </Grid>
            <Grid xs={12} md={6} className="grid-item">
                <TextField
                    className="inputField"
                    
                    id="filled-read-only-input"
                    label="Currency"
                    variant="filled"
                    value={custDetails?.currency ?? ""} />
                {/* <TextField select id="filled-basic" label="Currency" variant="filled" >
                    <MenuItem value="INR" >INR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="JPY">JPY</MenuItem>
                </TextField> */}

            </Grid>
        </>
    )
}
export default Customer;