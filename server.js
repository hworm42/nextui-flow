const express = require('express');
    const sqlite3 = require('sqlite').verbose();
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const app = express();
    const port = 3000;
    const logger = require('./src/utils/logger');
    const db = require('./db');

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

    // Middleware to check admin role
    const adminMiddleware = (req, res, next) => {
      if (req.session.user && req.session.user.role === 'admin') {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    };

    // Middleware to check moderator role
    const moderatorMiddleware = (req, res, next) => {
      if (req.session.user && (req.session.user.role === 'moderator' || req.session.user.role === 'admin')) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    };

    // API endpoint to register a new user
    app.post('/api/register', (req, res) => {
      const { username, email, password, role } = req.body;
      const created_at = new Date().toISOString();

      db.run('INSERT INTO Users (username, email, password_hash, created_at, role) VALUES (?, ?, ?, ?, ?)', [username, email, password, created_at, role], function(err) {
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

      db.get('SELECT * FROM Users WHERE email = ? AND password_hash = ?', [email, password], (err, row) => {
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
      db.all("SELECT id, username, email, created_at, role FROM Users", [], (err, rows) => {
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

    // API endpoint to delete a user (admin only)
    app.delete('/users/:id', adminMiddleware, (req, res) => {
      const { id } = req.params;

      db.run('DELETE FROM Users WHERE id = ?', id, function(err) {
        if (err) {
          logger.error(`Error deleting user: ${err.message}`);
          return res.status(400).json({ error: err.message });
        }
        logger.info('User deleted successfully');
        res.json({ message: 'User deleted successfully' });
      });
    });

    // API endpoint to delete a tweet (moderator or admin only)
    app.delete('/tweets/:id', moderatorMiddleware, (req, res) => {
      const { id } = req.params;

      db.run('DELETE FROM Tweets WHERE id = ?', id, function(err) {
        if (err) {
          logger.error(`Error deleting tweet: ${err.message}`);
          return res.status(400).json({ error: err.message });
        }
        logger.info('Tweet deleted successfully');
        res.json({ message: 'Tweet deleted successfully' });
      });
    });

    app.listen(port, () => {
      logger.info(`Server running at http://localhost:${port}`);
    });
