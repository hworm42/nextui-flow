import { getDb } from '../../db.js';

class Tweet {
  constructor({ _id, user_id, content, created_at }) {
    this._id = _id;
    this.user_id = user_id;
    this.content = content;
    this.created_at = created_at;
  }

  static async create(tweetData) {
    const db = await getDb();
    const result = await db.collection('tweets').insertOne(tweetData);
    return new Tweet({ ...tweetData, _id: result.insertedId });
  }

  static async findById(id) {
    const db = await getDb();
    const tweet = await db.collection('tweets').findOne({ _id: new ObjectId(id) });
    return tweet ? new Tweet(tweet) : null;
  }

  static async findByUserId(userId) {
    const db = await getDb();
    const tweets = await db.collection('tweets').find({ user_id: userId }).toArray();
    return tweets.map(tweet => new Tweet(tweet));
  }

  static async findAll() {
    const db = await getDb();
    const tweets = await db.collection('tweets').find().toArray();
    return tweets.map(tweet => new Tweet(tweet));
  }

  static async deleteById(id) {
    const db = await getDb();
    const result = await db.collection('tweets').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}

export default Tweet;
