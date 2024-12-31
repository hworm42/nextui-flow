import React from 'react';
import { Card, Text, Button, Container, Row, Col, Spacer } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate('/register');
  };

  return (
    <Container css={{ padding: '2rem', textAlign: 'center' }}>
      <Row justify="center" align="center">
        <Col>
          <Text h1>Welcome to Our Social Network!</Text>
          <Text h3>Join the community and connect with others.</Text>
          <Spacer y={2} />
          <Button onClick={handleJoinNow} size="lg">
            Join Now
          </Button>
          <Spacer y={2} />
          <Text>
            Already have an account? <a href="/login">Login</a>
          </Text>
        </Col>
      </Row>
      <Spacer y={4} />
      <Row justify="center" align="center">
        <Col>
          <Card>
            <Card.Body>
              <Text h4>Why Join Us?</Text>
              <Text>
                Connect with friends, share your thoughts, and discover new content. Our social network is designed to bring people together and foster meaningful connections.
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
