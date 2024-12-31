import logger from '../utils/logger';

class TweetService {
  async getTweets() {
    try {
      const response = await fetch('/api/tweets');
      const data = await response.json();
      return data.data;
    } catch (error) {
      logger.error(`Error fetching tweets: ${error.message}`);
      throw error;
    }
  }
}

export default new TweetService();
