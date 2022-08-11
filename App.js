import { Container } from '@mui/material';
import './App.css';
import Transfer from './Transfer';

function App() {
  return (
    <div className='App'>
      <Container maxWidth="sm | md" className='main-container' 
      sx={{ 
        p: "3rem", 
        bgcolor:"white",
        borderRadius:"2rem",
        mt:"5%"
      }}
      >
      <Transfer/>
      </Container>
    </div>
  );
}

export default App;
