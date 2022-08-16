import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AdbIcon from '@mui/icons-material/Adb';
import "../css/Login.css"
import { useNavigate } from 'react-router-dom';
function Login() {

    const [incorrectPasswordErr, setIncorrectPasswordErr] = useState(false)
    const [passwordNotFound, setPasswordNotFound] = useState("")
    const [userNotFound, setUserNotFound] = useState(false)
    const [userNotFoundError, setUserNotFoundError] = useState("")

    let navigate = useNavigate()

    const handleLoginBtn = () => {

        if( userName.length === 0 && password.length === 0){
            setPasswordNotFound("Please fill password")
            setUserNotFoundError("Please fill User Name")
            setIncorrectPasswordErr(true)
            setUserNotFound(true)
        }
        else{
        axios.get(`http://localhost:8080/loggers/${userName}`)
            .then((res) => {
                if (password !== res.data.password) {
                    setIncorrectPasswordErr(true)
                    setPasswordNotFound("Incorrect Password")
                }
                else {
                    navigate("/dashboard")

                }
            })
            .catch(err => {
                setUserNotFound(true)
                setUserNotFoundError("User Name not found !")
            })
        }
    }
    const handleBack = () => {
        navigate("/")
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const handleUserName = (event) => {
        setUserName(event.target.value)
        setUserNotFound(false)
        setUserNotFoundError("")
        setIncorrectPasswordErr(false)
        setPasswordNotFound("")
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
        setIncorrectPasswordErr(false)
        setPasswordNotFound("")
    }


    return (
        <>
            <AppBar position="static" color='transparent'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: "white" }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                                color: 'white'
                            }}
                        >
                            LOGO
                        </Typography>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: "white" }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                            <Button sx={{ color: "white" }} onClick={handleBack}>Back</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container
                maxWidth="sm | md"
                sx={{
                    p: "3rem",
                    bgcolor: "white",
                    borderRadius: "2rem",
                    mt: "5%"
                }} >
                <Grid container spacing={3} sx={{ width: "50%", ml: "25%" }}>
                    <Grid item xs={12} className="grid-item">
                        <LockIcon sx={{ fontSize: "6rem", color: "#123463" }} />
                    </Grid>
                    <Grid item xs={12} className="grid-item">
                        <TextField
                            sx={{ width: "60%" }}
                            id="filled-basic"
                            value={userName}
                            label="User Name"
                            onChange={handleUserName}
                            variant="filled"
                            error={userNotFound}
                            helperText={userNotFoundError} />
                    </Grid>
                    <Grid item xs={12} className="grid-item">
                        <TextField
                            sx={{ width: "60%" }}
                            id="filled-basic"
                            label="Password"
                            variant="filled"
                            value={password}
                            error={incorrectPasswordErr}
                            helperText={passwordNotFound}
                            onChange={handlePassword}
                            type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} className="grid-item">
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#123463",
                                width: "60%"
                            }}
                            endIcon={<LoginIcon />}
                            onClick={handleLoginBtn}
                        >Login
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default Login;