import React, { useState } from 'react';
import { Input, Button, Text, Link } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService.js';
import '../styles/formStyles.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await AuthService.forgotPassword(email);

      if (response.ok) {
        setSuccess('Password reset instructions sent to your email.');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send password reset instructions');
      }
    } catch (err) {
      setError('Failed to send password reset instructions');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', maxWidth: '400px', margin: '0 auto' }}>
      <Text h2>Forgot Password</Text>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
      />
      <Button onClick={handleForgotPassword} className="form-button">
        Send Reset Instructions
      </Button>
      {error && <Text className="form-error">{error}</Text>}
      {success && <Text className="form-success">{success}</Text>}
      <Text className="form-link">
        Remember your password? <Link href="/login">Login</Link>
      </Text>
    </div>
  );
};

export default ForgotPasswordPage;
