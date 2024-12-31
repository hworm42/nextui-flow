import React, { useEffect, useState } from 'react';
import { Card, Text } from '@nextui-org/react';
import logger from '../utils/logger';
import TweetService from '../services/TweetService.js';

const Feed = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const data = await TweetService.getTweets();
        logger.debug('Fetched tweets:', data);
        setTweets(data);
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
