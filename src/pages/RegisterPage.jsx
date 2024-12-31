import React, { useState } from 'react';
import { Input, Button, Text, Link } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService.js';
import '../styles/formStyles.css';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', maxWidth: '400px', margin: '0 auto' }}>
      <Text h2>Register</Text>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form-input"
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-input"
      />
      <Button onClick={handleRegister} className="form-button">
        Register
      </Button>
      {error && <Text className="form-error">{error}</Text>}
      <Text className="form-link">
        Already have an account? <Link href="/login">Login</Link>
      </Text>
      <Text className="form-link">
        Forgot your password? <Link href="/forgot-password">Forgot Password</Link>
      </Text>
    </div>
  );
};

export default RegisterPage;
