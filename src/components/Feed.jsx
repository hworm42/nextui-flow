import React, { useEffect, useState } from 'react';
import { Card, Text } from '@nextui-org/react';
import logger from '../utils/logger';

const Feed = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('/api/tweets');
        const data = await response.json();
        logger.debug('Fetched tweets:', data);
        setTweets(data.data);
      } catch (error) {
        logger.error(`Error fetching tweets: ${error.message}`);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div style={{ flex: 1, padding: '1rem' }}>
      {tweets.length === 0 ? (
        <Text>No tweets available.</Text>
      ) : (
        tweets.map((tweet) => (
          <Card key={tweet.id} style={{ marginBottom: '1rem' }}>
            <Card.Body>
              <Text>{tweet.content}</Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Feed;
