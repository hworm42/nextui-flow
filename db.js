import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import logger from './utils/logger';

let db;

async function connectToDatabase() {
  try {
    db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL,
        role TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tweets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    logger.info('Database connected and tables created');
  } catch (err) {
    logger.error(`Database connection error: ${err.message}`);
  }
}

connectToDatabase().catch(console.error);

export default db;
