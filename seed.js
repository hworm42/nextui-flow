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
  await db.run('BEGIN TRANSACTION');
  const insertUsers = db.prepare('INSERT INTO users (username, email, password_hash, created_at, role) VALUES (?, ?, ?, ?, ?)');
  for (const user of users) {
    await insertUsers.run(user.username, user.email, user.password_hash, user.created_at, user.role);
  }
  await insertUsers.finalize();
  await db.run('COMMIT');

  // Fetch inserted users to get their IDs
  const insertedUsers = await db.all('SELECT id, username FROM users');

  // Insert 100 sample tweets
  const tweets = [];
  for (let i = 0; i < 100; i++) {
    const user = insertedUsers[i % insertedUsers.length]; // Cycle through users
    const content = faker.lorem.sentence();
    const created_at = faker.date.past().toISOString();
    tweets.push({ user_id: user.id, content, created_at });
  }
  await db.run('BEGIN TRANSACTION');
  const insertTweets = db.prepare('INSERT INTO tweets (user_id, content, created_at) VALUES (?, ?, ?)');
  for (const tweet of tweets) {
    await insertTweets.run(tweet.user_id, tweet.content, tweet.created_at);
  }
  await insertTweets.finalize();
  await db.run('COMMIT');

  // Insert demo login user
  const demoUser = {
    username: 'demor',
    email: 'demo@example.com',
    password_hash: 'demo',
    created_at: new Date().toISOString(),
    role: 'user'
  };
  await db.run('INSERT INTO users (username, email, password_hash, created_at, role) VALUES (?, ?, ?, ?, ?)', demoUser.username, demoUser.email, demoUser.password_hash, demoUser.created_at, demoUser.role);

  // Insert demo tweets for demo user
  const demoTweets = [];
  for (let i = 0; i < 10; i++) {
    const content = faker.lorem.sentence();
    const created_at = faker.date.past().toISOString();
    demoTweets.push({ user_id: demoUser.id, content, created_at });
  }
  await db.run('BEGIN TRANSACTION');
  const insertDemoTweets = db.prepare('INSERT INTO tweets (user_id, content, created_at) VALUES (?, ?, ?)');
  for (const tweet of demoTweets) {
    await insertDemoTweets.run(tweet.user_id, tweet.content, tweet.created_at);
  }
  await insertDemoTweets.finalize();
  await db.run('COMMIT');

  console.log('Sample data inserted successfully');
};

insertSampleData().catch(console.error);
