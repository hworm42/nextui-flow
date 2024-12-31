import React, { useState } from 'react';
import { Input, Button, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService.js';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await AuthService.register(username, email, password);

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <Text h2>Register</Text>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
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
      <Button onClick={handleRegister}>Register</Button>
      {error && <Text color="error">{error}</Text>}
    </div>
  );
};

export default RegisterPage;
