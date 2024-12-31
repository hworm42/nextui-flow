const sqlite3 = require('sqlite').verbose();
    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
      // Create Users table
      db.run(`CREATE TABLE Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL,
        role TEXT NOT NULL
      )`);

      // Create Tweets table
      db.run(`CREATE TABLE Tweets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users (id)
      )`);

      // Create Follows table
      db.run(`CREATE TABLE Follows (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        follower_id INTEGER NOT NULL,
        followed_id INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (follower_id) REFERENCES Users (id),
        FOREIGN KEY (followed_id) REFERENCES Users (id)
      )`);

      // Create Likes table
      db.run(`CREATE TABLE Likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        tweet_id INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users (id),
        FOREIGN KEY (tweet_id) REFERENCES Tweets (id)
      )`);

      // Create Retweets table
      db.run(`CREATE TABLE Retweets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        tweet_id INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users (id),
        FOREIGN KEY (tweet_id) REFERENCES Tweets (id)
      )`);
    });

    module.exports = db;
