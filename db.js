import { openDB } from 'idb';
import logger from './src/utils/logger.js';

class Database {
  constructor() {
    this.dbPromise = openDB('twitter_mvp', 1, {
      upgrade(db) {
        db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        db.createObjectStore('tweets', { keyPath: 'id', autoIncrement: true });
      },
    });
    logger.info('Connected to idb');
  }

  async addUser(user) {
    const db = await this.dbPromise;
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    const result = await store.add(user);
    await tx.complete;
    return result;
  }

  async findUserByEmail(email) {
    const db = await this.dbPromise;
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const result = await store.getAll();
    await tx.complete;
    return result.find(u => u.email === email);
  }

  async findUserById(id) {
    const db = await this.dbPromise;
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const result = await store.get(id);
    await tx.complete;
    return result;
  }

  async addTweet(tweet) {
    const db = await this.dbPromise;
    const tx = db.transaction('tweets', 'readwrite');
    const store = tx.objectStore('tweets');
    const result = await store.add(tweet);
    await tx.complete;
    return result;
  }

  async findTweetsByUserId(userId) {
    const db = await this.dbPromise;
    const tx = db.transaction('tweets', 'readonly');
    const store = tx.objectStore('tweets');
    const result = await store.getAll();
    await tx.complete;
    return result.filter(tweet => tweet.user_id === userId);
  }
}

const db = new Database();
export default db;
