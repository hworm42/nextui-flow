import { db } from './db.js';
    import { faker } from '@faker-js/faker';

    const insertSampleData = async () => {
      const usersCollection = db.collection('users');
      const tweetsCollection = db.collection('tweets');

      // Insert 100 sample users
      const users = [];
      for (let i = 0; i < 100; i++) {
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password_hash = faker.internet.password();
        const created_at = faker.date.past().toISOString();
        const role = i < 10 ? 'admin' : i < 20 ? 'moderator' : 'user';
        users.push({ username, email, password_hash, created_at, role });
      }
      await usersCollection.insertMany(users);

      // Fetch inserted users to get their IDs
      const insertedUsers = await usersCollection.find().toArray();

      // Insert 100 sample tweets
      const tweets = [];
      for (let i = 0; i < 100; i++) {
        const user = insertedUsers[i % insertedUsers.length]; // Cycle through users
        const content = faker.lorem.sentence();
        const created_at = faker.date.past().toISOString();
        tweets.push({ user_id: user._id, content, created_at });
      }
      await tweetsCollection.insertMany(tweets);

      // Insert demo login user
      const demoUser = {
        username: 'demor',
        email: 'demo@example.com',
        password_hash: 'demo',
        created_at: new Date().toISOString(),
        role: 'user'
      };
      await usersCollection.insertOne(demoUser);

      // Insert demo tweets for demo user
      const demoTweets = [];
      for (let i = 0; i < 10; i++) {
        const content = faker.lorem.sentence();
        const created_at = faker.date.past().toISOString();
        demoTweets.push({ user_id: demoUser._id, content, created_at });
      }
      await tweetsCollection.insertMany(demoTweets);

      console.log('Sample data inserted successfully');
    };

    insertSampleData().catch(console.error);
