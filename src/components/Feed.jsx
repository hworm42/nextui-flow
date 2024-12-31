import React from 'react';
    import { Card, Text } from '@nextui-org/react';

    const Feed = ({ tweets }) => {
      return (
        <div style={{ flex: 1, padding: '1rem' }}>
          {tweets.map((tweet) => (
            <Card key={tweet._id} style={{ marginBottom: '1rem' }}>
              <Card.Body>
                <Text>{tweet.content}</Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
    };

    export default Feed;
