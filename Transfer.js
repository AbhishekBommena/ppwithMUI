
import Container from '@mui/material/Container';
import { useState } from 'react';

function Transfer(props) {
    const [transferType, setTransferType] = useState('');
    const handleChange = (event) => {
        setTransferType(event.target.value);
    };
    return (
        <Container maxWidth="sm" sx={{bgcolor:"red"}}>
            hello
        </Container>
    )
}
export default Transfer;