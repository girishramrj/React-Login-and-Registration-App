import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';

const Profile = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  return (
    <Container className="text-center" style={{ marginTop: '100px' }}>
      <h2>Hi, {username}!</h2>
      <p>Welcome to your profile page!</p>
      <Button variant="outlined" color="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Container>
  );
};

export default Profile;
