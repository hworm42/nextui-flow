import React, { useState } from 'react';
    import { Input, Button, Text, Link } from '@nextui-org/react';
    import { useNavigate } from 'react-router-dom';
    import AuthService from '../services/AuthService.js';
    import '../styles/formStyles.css';

    const LoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const navigate = useNavigate();

      const handleLogin = async () => {
        try {
          const response = await AuthService.login(email, password);
          if (response.ok) {
            navigate('/feed');
          } else {
            const data = await response.json();
            setError(data.error || 'Login failed');
          }
        } catch (err) {
          setError('Login failed');
        }
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', maxWidth: '400px', margin: '0 auto' }}>
          <Text h2>Login</Text>
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
          <Button onClick={handleLogin} className="form-button">
            Login
          </Button>
          {error && <Text className="form-error">{error}</Text>}
          <Text className="form-link">
            Don't have an account? <Link href="/register">Register</Link>
          </Text>
          <Text className="form-link">
            Forgot your password? <Link href="/forgot-password">Forgot Password</Link>
          </Text>
        </div>
      );
    };

    export default LoginPage;
