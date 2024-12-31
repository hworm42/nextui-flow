const sqlite3 = require('sqlite').verbose();
    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
      // Create Users table
      db.run(`CREATE TABLE Users (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Username TEXT NOT NULL,
        Email TEXT NOT NULL,
        Password TEXT NOT NULL,
        DateCreated TEXT NOT NULL,
        Bio TEXT,
        ProfilePicture TEXT,
        FollowersCount INTEGER DEFAULT 0,
        FollowingCount INTEGER DEFAULT 0
      )`);

      // Create Tweets table
      db.run(`CREATE TABLE Tweets (
        TweetID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER NOT NULL,
        Content TEXT NOT NULL,
        DateCreated TEXT NOT NULL,
        RetweetCount INTEGER DEFAULT 0,
        LikeCount INTEGER DEFAULT 0,
        FOREIGN KEY (UserID) REFERENCES Users (UserID)
      )`);

      // Create Followers table
      db.run(`CREATE TABLE Followers (
        FollowerID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER NOT NULL,
        FollowerUserID INTEGER NOT NULL,
        FOREIGN KEY (UserID) REFERENCES Users (UserID),
        FOREIGN KEY (FollowerUserID) REFERENCES Users (UserID)
      )`);

      // Create Retweets table
      db.run(`CREATE TABLE Retweets (
        RetweetID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER NOT NULL,
        TweetID INTEGER NOT NULL,
        DateCreated TEXT NOT NULL,
        FOREIGN KEY (UserID) REFERENCES Users (UserID),
        FOREIGN KEY (TweetID) REFERENCES Tweets (TweetID)
      )`);

      // Create Likes table
      db.run(`CREATE TABLE Likes (
        LikeID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER NOT NULL,
        TweetID INTEGER NOT NULL,
        DateCreated TEXT NOT NULL,
        FOREIGN KEY (UserID) REFERENCES Users (UserID),
        FOREIGN KEY (TweetID) REFERENCES Tweets (TweetID)
      )`);

      // Create Hashtags table
      db.run(`CREATE TABLE Hashtags (
        HashtagID INTEGER PRIMARY KEY AUTOINCREMENT,
        HashtagText TEXT NOT NULL
      )`);

      // Create TweetHashtags table
      db.run(`CREATE TABLE TweetHashtags (
        TweetHashtagID INTEGER PRIMARY KEY AUTOINCREMENT,
        TweetID INTEGER NOT NULL,
        HashtagID INTEGER NOT NULL,
        FOREIGN KEY (TweetID) REFERENCES Tweets (TweetID),
        FOREIGN KEY (HashtagID) REFERENCES Hashtags (HashtagID)
      )`);

      // Create Messages table
      db.run(`CREATE TABLE Messages (
        MessageID INTEGER PRIMARY KEY AUTOINCREMENT,
        SenderID INTEGER NOT NULL,
        ReceiverID INTEGER NOT NULL,
        Content TEXT NOT NULL,
        DateCreated TEXT NOT NULL,
        FOREIGN KEY (SenderID) REFERENCES Users (UserID),
        FOREIGN KEY (ReceiverID) REFERENCES Users (UserID)
      )`);

      // Create Notifications table
      db.run(`CREATE TABLE Notifications (
        NotificationID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER NOT NULL,
        Type TEXT NOT NULL,
        Content TEXT NOT NULL,
        DateCreated TEXT NOT NULL,
        FOREIGN KEY (UserID) REFERENCES Users (UserID)
      )`);
    });

    module.exports = db;
