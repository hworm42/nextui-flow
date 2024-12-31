import db from './db.js';
    import { faker } from '@faker-js/faker';

    const insertSampleData = async () => {
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
      await db.collection('users').insertMany(users);

      // Insert 100 sample tweets
      const tweets = [];
      for (let i = 0; i < 100; i++) {
        const user_id = i + 1;
        const content = faker.lorem.sentence();
        const created_at = faker.date.past().toISOString();
        tweets.push({ user_id, content, created_at });
      }
      await db.collection('tweets').insertMany(tweets);

      // Insert 100 sample replies
      const replies = [];
      for (let i = 0; i < 100; i++) {
        const user_id = i + 1;
        const tweet_id = i + 1;
        const content = faker.lorem.sentence();
        const created_at = faker.date.past().toISOString();
        replies.push({ user_id, tweet_id, content, created_at });
      }
      await db.collection('replies').insertMany(replies);

      // Insert demo login user
      const demoUser = {
        username: 'demor',
        email: 'demo@example.com',
        password_hash: 'demo',
        created_at: new Date().toISOString(),
        role: 'user'
      };
      await db.collection('users').insertOne(demoUser);
    };

    insertSampleData().catch(console.error);
