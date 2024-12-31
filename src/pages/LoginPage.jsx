import React, { useState } from 'react';
import { Input, Button, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await AuthService.login(email, password);

    if (response.ok) {
      navigate('/feed');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <Text h2>Login</Text>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginPage;
