import logger from '../utils/logger';
    import { getDb } from '../../db.js';

    class TweetService {
      async getTweets() {
        try {
          const db = await getDb();
          const user = JSON.parse(sessionStorage.getItem('user'));
          const tweets = await db.collection('tweets').find({ user_id: user._id }).toArray();
          return tweets;
        } catch (error) {
          logger.error(`Error fetching tweets: ${error.message}`);
          throw error;
        }
      }
    }

    export default new TweetService();
