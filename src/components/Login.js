import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Container } from '@mui/material'; // MUI components
import Form from 'react-bootstrap/Form'; // Bootstrap Form

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://13.48.190.30:5000/api/login', { username, password }); //Your desired Address
      const { user } = res.data;
      localStorage.setItem('username', user.username);
      navigate('/profile');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Container style={{ marginTop: '100px', maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Login</h2>
      <Form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth className="mt-3">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
