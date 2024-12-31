import db from '../../db.js';
import logger from '../utils/logger.js';

class TweetService {
  async addTweet(tweet) {
    try {
      const result = await db.addTweet(tweet);
      return result;
    } catch (error) {
      logger.error(`Error adding tweet: ${error.message}`);
      throw error;
    }
  }

  async findTweetsByUserId(userId) {
    try {
      const tweets = await db.findTweetsByUserId(userId);
      return tweets;
    } catch (error) {
      logger.error(`Error finding tweets by user ID: ${error.message}`);
      throw error;
    }
  }
}

export default new TweetService();
