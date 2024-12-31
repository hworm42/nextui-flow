import React from 'react';
    import { Card, Text } from '@nextui-org/react';

    const Feed = () => {
      return (
        <div style={{ flex: 1, padding: '1rem' }}>
          <Card>
            <Card.Body>
              <Text>Welcome to the feed!</Text>
            </Card.Body>
          </Card>
          {/* Add more feed items here */}
        </div>
      );
    };

    export default Feed;
