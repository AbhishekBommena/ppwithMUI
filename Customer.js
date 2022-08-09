import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import CurrencyRupeeIcon  from '@mui/icons-material/CurrencyRupee';
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound" 
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import EuroIcon from "@mui/icons-material/Euro" 
// import {CurrencyRupeeIcon, CurrencyPoundIcon, CurrencyYenIcon, AttachMoneyIcon, EuroIcon } from '@mui/icons-material';
import "../css/Form.css"
function Customer(props) {
    const [currency,setCurrency] = useState("")
    const custDetails = props.custDetails
    const handleCurrency = (event) => {
        setCurrency(event.target.value)
    }
    return (
        <>
            <Grid item  xs={12} md={6} className="grid-item">
                <TextField id="filled-read-only-input"
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Account Holder Name"
                    variant="filled"
                    className="inputField"
                    value={custDetails?.acctHolderName ?? ""} />
            </Grid>
            <Grid item xs={12} md={6} className="grid-item">
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
            <Grid item xs={12} md={6} className="grid-item">
                <TextField
                    className='inputField'
                    id="outlined-select-currency"
                    select
                    label="Currency"
                    value={currency}
                    onChange={handleCurrency}
                    variant="filled"
                    // helperText="Please select your currency"
                >   
                    <MenuItem value="EUR">EUR (<EuroIcon fontSize="inherit"/>)</MenuItem>
                    <MenuItem value="GBP">GBP (<CurrencyPoundIcon fontSize="inherit"/>)</MenuItem>
                    <MenuItem value="INR">INR (<CurrencyRupeeIcon fontSize="inherit" />)</MenuItem>
                    <MenuItem value="JPY">JPY (<CurrencyYenIcon fontSize="inherit" />)</MenuItem>
                    <MenuItem value="USD">USD (<AttachMoneyIcon fontSize="inherit" />)</MenuItem>
                </TextField>
                {/* <TextField
                    className="inputField"

                    id="filled-read-only-input"
                    label="Currency"
                    variant="filled"
                    value={custDetails?.currency ?? ""} /> */}

            </Grid>
        </>
    )
}
export default Customer;