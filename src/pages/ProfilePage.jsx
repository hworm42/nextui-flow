import React from 'react';
import { Card, Text } from '@nextui-org/react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { username } = useParams();
  return (
    <div>
      <h1>{username}'s Profile</h1>
      <Card>
        <Card.Body>
          <Text>This is {username}'s profile page.</Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
