const express = require('express');
    const sqlite3 = require('sqlite').verbose();
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const app = express();
    const port = 3000;
    const logger = require('./src/utils/logger');

    // Initialize SQLite database
    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
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
    });

    app.use(bodyParser.json());
    app.use(session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    }));

    // Middleware to check authentication
    const authMiddleware = (req, res, next) => {
      if (req.session.user) {
        next();
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    };

    // API endpoint to register a new user
    app.post('/api/register', (req, res) => {
      const { username, email, password } = req.body;
      const dateCreated = new Date().toISOString();

      db.run('INSERT INTO Users (Username, Email, Password, DateCreated) VALUES (?, ?, ?, ?)', [username, email, password, dateCreated], function(err) {
        if (err) {
          logger.error(`Registration error: ${err.message}`);
          return res.status(400).json({ error: err.message });
        }
        logger.info('User registered successfully');
        res.json({ message: 'User registered successfully' });
      });
    });

    // API endpoint to login a user
    app.post('/api/login', (req, res) => {
      const { email, password } = req.body;

      db.get('SELECT * FROM Users WHERE Email = ? AND Password = ?', [email, password], (err, row) => {
        if (err) {
          logger.error(`Login error: ${err.message}`);
          return res.status(400).json({ error: err.message });
        }
        if (row) {
          req.session.user = row;
          logger.info('Login successful');
          res.json({ message: 'Login successful', user: row });
        } else {
          logger.warn('Invalid credentials');
          res.status(400).json({ error: 'Invalid credentials' });
        }
      });
    });

    // API endpoint to get users (protected)
    app.get('/users', authMiddleware, (req, res) => {
      db.all("SELECT UserID AS id, Username, Email, DateCreated, Bio, ProfilePicture, FollowersCount, FollowingCount FROM Users", [], (err, rows) => {
        if (err) {
          logger.error(`Error fetching users: ${err.message}`);
          res.status(400).json({ error: err.message });
          return;
        }
        logger.info('Users fetched successfully');
        res.json({
          message: "success",
          data: rows
        });
      });
    });

    app.listen(port, () => {
      logger.info(`Server running at http://localhost:${port}`);
    });
