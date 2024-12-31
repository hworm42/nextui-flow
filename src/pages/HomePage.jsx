import React from 'react';
    import { Card, Text } from '@nextui-org/react';
    import logger from '../utils/logger';

    const HomePage = () => {
      logger.info('HomePage component rendered');
      return (
        <div>
          <h1>Home Page</h1>
          <Card>
            <Card.Body>
              <Text>Welcome to Flow, your Twitter MVP!</Text>
            </Card.Body>
          </Card>
        </div>
      );
    };

    export default HomePage;
