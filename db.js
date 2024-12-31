import initSqlJs from 'sql.js';

    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });

    const db = new SQL.Database();

    db.run(`CREATE TABLE Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      role TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE Tweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users (id)
    )`);

    db.run(`CREATE TABLE Follows (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      follower_id INTEGER NOT NULL,
      followed_id INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (follower_id) REFERENCES Users (id),
      FOREIGN KEY (followed_id) REFERENCES Users (id)
    )`);

    db.run(`CREATE TABLE Likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      tweet_id INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users (id),
      FOREIGN KEY (tweet_id) REFERENCES Tweets (id)
    )`);

    db.run(`CREATE TABLE Retweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      tweet_id INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users (id),
      FOREIGN KEY (tweet_id) REFERENCES Tweets (id)
    )`);

    db.run(`CREATE TABLE Replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      tweet_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users (id),
      FOREIGN KEY (tweet_id) REFERENCES Tweets (id)
    )`);

    export default db;
