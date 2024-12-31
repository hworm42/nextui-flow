import logger from './src/utils/logger';

    let db;
    let client;
    let ObjectId;

    const connectToDatabase = async () => {
      const { MongoClient, ObjectId: MongoObjectId } = await import('mongodb');
      ObjectId = MongoObjectId;

      const uri = 'mongodb://admin:password@localhost:27017';
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

      try {
        await client.connect();
        db = client.db('twitter_mvp');

        await db.command({ ping: 1 });
        logger.info('Connected to MongoDB');

        await db.createCollection('users');
        await db.createCollection('tweets');

        logger.info('Collections created');
      } catch (err) {
        logger.error(`Database connection error: ${err.message}`);
        throw err;
      }
    };

    const getDb = async () => {
      if (!db) {
        await connectToDatabase();
      }
      return db;
    };

    const getObjectId = async () => {
      if (!ObjectId) {
        await connectToDatabase();
      }
      return ObjectId;
    };

    export { getDb, getObjectId };
