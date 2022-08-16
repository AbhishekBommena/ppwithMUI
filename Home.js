import { Grid, Typography } from "@mui/material";
import transactionImage from "../images/Image.png"
import Container from "@mui/material/Container";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AdbIcon from '@mui/icons-material/Adb';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
function Home() {

    let navigate = useNavigate()
    const handleLogin = () => {
        navigate("/login")
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
                            PayOnline
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
                            PayOnline
                        </Typography>
                        <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                            <Button sx={{ color: "white" }} onClick={handleLogin}>Login</Button>
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
                <Grid container >
                    <Grid item xs={12} md={6}  className="grid-item">
                        <img src={transactionImage} height="100%" width="50%" alt="normal_image" />
                    </Grid>
                    <Grid item xs={12} md={6} className="grid-item">
                        <Typography variant="h3" sx={{ color: "#123463",mt:'4rem' }} component="div" gutterBottom>
                            Banking Karlo
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default Home;