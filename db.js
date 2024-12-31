import { MongoClient } from 'mongodb';

    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    let db;

    async function connectToDatabase() {
      await client.connect();
      db = client.db('twitter_clone');

      // Create collections if they don't exist
      await db.createCollection('users');
      await db.createCollection('tweets');
      await db.createCollection('follows');
      await db.createCollection('likes');
      await db.createCollection('retweets');
      await db.createCollection('replies');
    }

    connectToDatabase().catch(console.error);

    export default db;
