import '../App.css'
import "../css/Transfer.css"
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { MenuItem } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound"
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import EuroIcon from "@mui/icons-material/Euro"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from './NavBar';

function Transfer() {

    // getting date 
    const dateObject = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = dateObject.getDate() + " / " + months[dateObject.getMonth()] + " / " + dateObject.getFullYear();

    // customer Variables
    const [customerErrorHandler, setCustomerErrorHandler] = useState(false)
    const [customerid, setCustomerId] = useState("");
    const [custIdNotFound, setCustIdNotFound] = useState(null);
    const [custDetails, setCustDetails] = useState({});
    const [clearbalance, setClearBalance] = useState("");
    const [currencycode, setCurrencyCode] = useState("");


    // receiver Variables
    const [bic, setBic] = useState("");
    const [receiverDetails, setReceiverDetails] = useState({});
    const [receiverErrorHandler, setReceiverErrorHandler] = useState(false)
    const [receiverNotFound, setReceiverNotFound] = useState(null);

    //transfer variables
    const [transfertypecode, setTransferTypeCode] = useState("");
    const [messagecode, setMessageCode] = useState("");
    const [accountholdernumber, setAccountHolderNumber] = useState("");
    const [accountholdername, setAccountHolderName] = useState("");
    const [currencyamount, setCurrencyAmount] = useState("");
    const [transferfee, setTransferFee] = useState(0);
    const [inramount, setInrAmount] = useState(0);

    // ErrorHandlers

    const handleAccountHolderNumber = (e) => {
        setAccountHolderNumber(e.target.value);
    }

    const handleAccountHolderName = (e) => {
        setAccountHolderName(e.target.value);
    }

    useEffect(() => {
        if (customerid.length === 5) {
            axios.get(`http://localhost:8080/Customers/${customerid}`)
                .then((res) => {
                    setCustDetails(res.data)
                    setClearBalance(res.data.clearbalance)
                    setCustIdNotFound(null)
                    setCustomerErrorHandler(false)
                })
                .catch(err => {
                    setCustDetails({})
                    setCustomerErrorHandler(true)
                    setCustIdNotFound("Customer ID Not Found")
                })
        }
        else {
            if (customerid.length > 0) {
                setCustomerErrorHandler(true)
                setCustIdNotFound("Please enter Valid Customer ID")
            }
            if (customerid.length === 0) {
                setCustomerErrorHandler(false)
                setCustIdNotFound("")
            }
            setCustDetails({})
        }
    }, [customerid])

    const handleCustomerId = (event) => {
        event.preventDefault()
        setCustomerId(event.target.value)
    }
    // FOR MAKING RECEIVER FIELDS EMPTY WHEN CUSTOMER ID IS CHANGED
    // useEffect(() => {
    //     setReceiverDetails({})
    //     setBic("")
    //     setAccountHolderName("")
    //     setAccountHolderNumber("")
    // }, [customerid])


    useEffect(() => {
        const lengthOfBic = bic.length
        if (lengthOfBic === 11) {
            axios.get(`http://localhost:8080/receiver/${bic}`)
                .then((res) => {
                    setReceiverDetails(res.data)
                    setReceiverNotFound(null)
                    setReceiverErrorHandler(false)
                })
                .catch(err => {
                    setReceiverDetails({})
                    setReceiverErrorHandler(true)
                    setReceiverNotFound("BIC Not Found ")
                })
        }
        else {
            if (lengthOfBic > 0) {
                setReceiverErrorHandler(true)
                setReceiverNotFound("Please enter valid BIC")
            }
            if (lengthOfBic === 0) {
                setReceiverErrorHandler(false)
                setReceiverNotFound("")
            }
            setReceiverDetails({})
        }
    }, [bic])

    const handleWithBic = (event) => {
        event.preventDefault()
        setBic(event.target.value)
    }

    const handleTransferTypeCode = (e) => {
        setTransferTypeCode(e.target.value);
    }
    const handleMessageCode = (e) => {
        setMessageCode(e.target.value);
    }

    const handleCurrency = (e) => {
        setCurrencyCode(e.target.value)
    }


    const handleValidation = () => {
        if (customerid.length > 0 && currencycode.length > 0 &&
            bic.length > 0 && accountholdername.length > 0 &&
            accountholdernumber.length > 0 && transfertypecode.length > 0
            && messagecode.length > 0 && currencyamount.length > 0) {
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            customerid: customerid, //dbtable:frontend
            bic: bic,
            currencycode: currencycode,
            transferfee: transferfee,
            receiveraccountholdername: accountholdername,
            receiveraccountholdernumber: accountholdernumber,
            transfertypecode: transfertypecode,
            messagecode: messagecode,
            currencyamount: currencyamount,
            transferfees: transferfee,
            inramount: inramount,
        };

        axios.post("http://localhost:8080/api/transactions", data)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleCurrencyAmount = (e) => {
        const currencyamount = e.target.value
        if (currencyamount > clearbalance) {
            setCurrencyAmount(currencyamount)
            setTransferFee("")
            setInrAmount("")
        }

        else {
            setCurrencyAmount(currencyamount)
            const transferfee = (currencyamount * 0.25) / 100
            setTransferFee(transferfee)
            if (currencycode === "USD") {
                const inramount = currencyamount * 74;
                const finalAmt = clearbalance - inramount - transferfee
                setInrAmount(finalAmt)
            }
        }


    }

    return (
        <>
            <NavBar />
            <Container maxWidth="sm | md" className='main-container'
                sx={{
                    p: "3rem",
                    bgcolor: "white",
                    borderRadius: "2rem",
                    mt: "5%"
                }}
            >
                <Grid container rowSpacing={3}>
                    <Grid item xs={12} md={6} className="grid-item">
                        <Typography variant="h5" className="side-heading"
                            sx={{
                                color: "#123463",
                                fontWeight: "bold",
                                textAlign: "left",
                                ml: "20%"
                            }}
                            gutterBottom component="div">
                            Payer Account Details
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item" >
                        <Typography variant="subtitle2"
                            sx={{
                                color: "#123463",
                                fontWeight: "bold",
                                textAlign: "left",
                                ml: "20%"
                            }}
                            gutterBottom component="div">
                            Booking Date : {date}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12} md={6} className="grid-item" >
                        <TextField
                            required
                            error={customerErrorHandler}
                            className="inputField"
                            helperText={custIdNotFound}
                            id="filled-basic"
                            label="Customer ID"
                            variant="filled"
                            value={customerid}
                            onChange={handleCustomerId}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item">
                        <TextField id="filled-read-only-input"
                            InputProps={{
                                readOnly: true,
                            }}
                            label="Account Holder Name"
                            variant="filled"
                            className="inputField"
                            /* CHANGED acctHolderName === accountholdername */
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
                            /* CHANGED clearBalance === clearbalance */
                            value={custDetails?.clearBalance ?? ""}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item">
                        <TextField
                            className='inputField'
                            id="outlined-select-currency"
                            // error={currencyErr}
                            select
                            label="Currency"
                            value={currencycode}
                            onChange={handleCurrency}
                            variant="filled"
                        // helperText="Please select your currency"
                        >
                            <MenuItem value="EUR">EUR (<EuroIcon fontSize="inherit" />)</MenuItem>
                            <MenuItem value="GBP">GBP (<CurrencyPoundIcon fontSize="inherit" />)</MenuItem>
                            <MenuItem value="INR">INR (<CurrencyRupeeIcon fontSize="inherit" />)</MenuItem>
                            <MenuItem value="JPY">JPY (<CurrencyYenIcon fontSize="inherit" />)</MenuItem>
                            <MenuItem value="USD">USD (<AttachMoneyIcon fontSize="inherit" />)</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={3} sx={{ mt: "8px" }}>
                    <Grid item xs={12} md={6} className="grid-item">
                        <Typography variant="h5" className="side-heading"
                            sx={{
                                color: "#123463",
                                fontWeight: "bold",
                                textAlign: "left",
                                ml: "20%"
                            }}
                            gutterBottom component="div">
                            Beneficiary Account Details
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12} md={6} className="grid-item" >
                        <TextField
                            required
                            error={receiverErrorHandler}
                            className="inputField"
                            helperText={receiverNotFound}
                            id="filled-basic"
                            label="BIC"
                            variant="filled"
                            value={bic}
                            onChange={handleWithBic}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item">
                        <TextField id="filled-read-only-input"
                            InputProps={{
                                readOnly: true,
                            }}
                            label="Bank Name"
                            variant="filled"
                            className="inputField"
                            /* CHANGED instituteName === bankname */
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
                            value={accountholdername}
                            onChange={handleAccountHolderName}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item">
                        <TextField
                            required
                            className="inputField"
                            id="filled-read-only-input"
                            label="Account Holder Number"
                            variant="filled"
                            value={accountholdernumber}
                            onChange={handleAccountHolderNumber}
                        />
                    </Grid>
                </Grid>
                <Grid container rowSpacing={3} sx={{ mt: "8px" }}>
                    <Grid item xs={12} md={6} className="grid-item">
                        <Typography variant="h5" className="side-heading"
                            sx={{
                                color: "#123463",
                                fontWeight: "bold",
                                textAlign: "left",
                                ml: "20%"
                            }}
                            gutterBottom component="div">
                            Transfer Details
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12} md={6} className="grid-item">
                        <TextField
                            className='inputField'
                            id="outlined-select-currency"
                            select
                            label="Transfer Type"
                            value={transfertypecode}
                            onChange={handleTransferTypeCode}
                            variant="filled"
                        // helperText="Please select your currency"
                        >
                            <MenuItem value="Customer Type">Customer</MenuItem>
                            <MenuItem value="Bank Type">Bank</MenuItem>
                        </TextField>

                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item">
                        <TextField
                            className='inputField'
                            id="outlined-select-currency"
                            select
                            label="Message Code"
                            value={messagecode}
                            onChange={handleMessageCode}
                            variant="filled"
                        // helperText="Please select your currency"
                        >
                            <MenuItem value="CHQB">CHQB</MenuItem>
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
                            type="number"
                            // error={errorHandler}
                            // helperText={amountExceedingErr}
                            value={currencyamount}
                            onChange={handleCurrencyAmount}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item">
                        <TextField
                            InputProps={{
                                readOnly: true
                            }}
                            label="Transfer Fee"
                            variant="filled"
                            className="inputField"
                            value={transferfee}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item">
                        <TextField
                            InputProps={{
                                readOnly: true
                            }}
                            label="Clear Balance"
                            variant="filled"
                            className="inputField"
                            value={inramount}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item">
                        <Button
                            variant="contained"
                            size="medium"
                            endIcon={<SendIcon />}
                            sx={{
                                bgcolor: "#123463",
                                '&:hover':{
                                    bgcolor:"#415c82"
                                }
                            }}
                            onClick={handleSubmit}
                            className="inputField"
                            disabled={handleValidation()}
                        >
                            Transfer
                        </Button><br />
                        <Typography variant="caption" sx={{ mt: "8px" }} display="block" gutterBottom>
                            *Button is enabled only if all fields are filled.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>

    )

}
export default Transfer;