import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; // MUI Button
import Container from 'react-bootstrap/Container'; // Bootstrap Container

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <h1 className="mb-4">Welcome to the App</h1>
      <Button variant="contained" color="primary" onClick={() => navigate('/login')} className="mb-2">
        Login
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/register')}>
        Register
      </Button>
    </Container>
  );
};

export default Home;
