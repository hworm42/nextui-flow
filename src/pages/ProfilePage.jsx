import React from 'react';
    import { Card, Text } from '@nextui-org/react';
    import logger from '../utils/logger';

    const ProfilePage = () => {
      logger.info('ProfilePage component rendered');
      return (
        <div>
          <h1>Profile Page</h1>
          <Card>
            <Card.Body>
              <Text>This is your profile page.</Text>
            </Card.Body>
          </Card>
        </div>
      );
    };

    export default ProfilePage;
