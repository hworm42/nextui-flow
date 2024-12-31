import db from './db';
    import { faker } from '@faker-js/faker';

    const insertSampleData = () => {
      // Insert 100 sample users
      const users = [];
      for (let i = 0; i < 100; i++) {
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password_hash = faker.internet.password();
        const created_at = faker.date.past().toISOString();
        const role = i < 10 ? 'admin' : i < 20 ? 'moderator' : 'user';
        users.push([username, email, password_hash, created_at, role]);
      }
      const insertUsers = db.prepare('INSERT INTO Users (username, email, password_hash, created_at, role) VALUES (?, ?, ?, ?, ?)');
      db.run('BEGIN TRANSACTION');
      users.forEach(user => insertUsers.run(user));
      db.run('COMMIT');
      insertUsers.finalize();

      // Insert 100 sample tweets
      const tweets = [];
      for (let i = 0; i < 100; i++) {
        const user_id = i + 1;
        const content = faker.lorem.sentence();
        const created_at = faker.date.past().toISOString();
        tweets.push([user_id, content, created_at]);
      }
      const insertTweets = db.prepare('INSERT INTO Tweets (user_id, content, created_at) VALUES (?, ?, ?)');
      db.run('BEGIN TRANSACTION');
      tweets.forEach(tweet => insertTweets.run(tweet));
      db.run('COMMIT');
      insertTweets.finalize();

      // Insert 100 sample replies
      const replies = [];
      for (let i = 0; i < 100; i++) {
        const user_id = i + 1;
        const tweet_id = i + 1;
        const content = faker.lorem.sentence();
        const created_at = faker.date.past().toISOString();
        replies.push([user_id, tweet_id, content, created_at]);
      }
      const insertReplies = db.prepare('INSERT INTO Replies (user_id, tweet_id, content, created_at) VALUES (?, ?, ?, ?)');
      db.run('BEGIN TRANSACTION');
      replies.forEach(reply => insertReplies.run(reply));
      db.run('COMMIT');
      insertReplies.finalize();
    };

    insertSampleData();
