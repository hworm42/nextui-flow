import React, { useState } from 'react';
import { Input, Button, Text, Link } from '@nextui-org/react';
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
      await AuthService.register(username, email, password);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', maxWidth: '400px', margin: '0 auto' }}>
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
      <Button onClick={handleRegister} style={{ marginBottom: '1rem' }}>
        Register
      </Button>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Text>
        Already have an account? <Link href="/login">Login</Link>
      </Text>
    </div>
  );
};

export default RegisterPage;
