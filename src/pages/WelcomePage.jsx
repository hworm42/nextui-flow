import React from 'react';
import { Button, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate('/register');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <Text h1>Welcome to Our Social Network!</Text>
      <Text h3>Join the community and connect with others.</Text>
      <Button onClick={handleJoinNow} style={{ marginTop: '2rem' }}>
        Join Now
      </Button>
    </div>
  );
};

export default WelcomePage;
