import express from 'express';
    import bodyParser from 'body-parser';
    import session from 'express-session';
    import logger from './src/utils/logger';
    import { getDb, getObjectId } from './db.js';

    const app = express();
    const port = 3000;

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
    app.post('/api/register', async (req, res) => {
      const { username, email, password, role } = req.body;
      const created_at = new Date().toISOString();

      try {
        const db = await getDb();
        const result = await db.collection('users').insertOne({ username, email, password_hash: password, created_at, role });
        logger.info('User registered successfully');
        res.json({ message: 'User registered successfully', userId: result.insertedId });
      } catch (err) {
        logger.error(`Registration error: ${err.message}`);
        if (err.code === 11000) {
          res.status(409).json({ error: 'Email already exists' });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });

    // API endpoint to login a user
    app.post('/api/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        const db = await getDb();
        const user = await db.collection('users').findOne({ email, password_hash: password });
        if (user) {
          req.session.user = user;
          logger.info('Login successful');
          res.json({ message: 'Login successful', user });
        } else {
          logger.warn('Invalid credentials');
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } catch (err) {
        logger.error(`Login error: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // API endpoint to get users (protected)
    app.get('/api/users', authMiddleware, async (req, res) => {
      try {
        const db = await getDb();
        const users = await db.collection('users').find({}, { projection: { username: 1, email: 1, created_at: 1, role: 1 } }).toArray();
        logger.info('Users fetched successfully');
        res.json({ message: 'success', data: users });
      } catch (err) {
        logger.error(`Error fetching users: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // API endpoint to delete a user (admin only)
    app.delete('/api/users/:id', adminMiddleware, async (req, res) => {
      const { id } = req.params;

      try {
        const db = await getDb();
        const ObjectId = await getObjectId();
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          logger.info('User deleted successfully');
          res.json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (err) {
        logger.error(`Error deleting user: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // API endpoint to delete a tweet (moderator or admin only)
    app.delete('/api/tweets/:id', moderatorMiddleware, async (req, res) => {
      const { id } = req.params;

      try {
        const db = await getDb();
        const ObjectId = await getObjectId();
        const result = await db.collection('tweets').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          logger.info('Tweet deleted successfully');
          res.json({ message: 'Tweet deleted successfully' });
        } else {
          res.status(404).json({ error: 'Tweet not found' });
        }
      } catch (err) {
        logger.error(`Error deleting tweet: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // API endpoint to get tweets for a logged-in user
    app.get('/api/tweets', authMiddleware, async (req, res) => {
      const userId = req.session.user._id;

      try {
        const db = await getDb();
        const tweets = await db.collection('tweets').find({ user_id: userId }).toArray();
        logger.info('Tweets fetched successfully');
        res.json({ message: 'success', data: tweets });
      } catch (err) {
        logger.error(`Error fetching tweets: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // API endpoint to debug database
    app.post('/api/debug', async (req, res) => {
      try {
        const db = await getDb();
        // Example: Check for duplicate emails
        const duplicateEmails = await db.collection('users').aggregate([
          { $group: { _id: "$email", count: { $sum: 1 } } },
          { $match: { count: { $gt: 1 } } }
        ]).toArray();
        if (duplicateEmails.length > 0) {
          logger.warn('Duplicate emails found:', duplicateEmails);
          res.json({ message: 'Duplicate emails found', data: duplicateEmails });
        } else {
          res.json({ message: 'No issues found' });
        }
      } catch (err) {
        logger.error(`Database debugging error: ${err.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.listen(port, () => {
      logger.info(`Server running at http://localhost:${port}`);
    });
