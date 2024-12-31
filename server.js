import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import logger from './src/utils/logger.js';
import db from './db.js';
import UserService from './src/services/UserService.js';
import TweetService from './src/services/TweetService.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Middleware to log requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// API endpoint to register a new user
app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  const created_at = new Date().toISOString();

  try {
    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    const newUser = { username, email, password_hash: password, created_at, role };
    const result = await UserService.addUser(newUser);
    logger.info('User registered successfully');
    res.json({ message: 'User registered successfully', userId: result });
  } catch (err) {
    logger.error(`Registration error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// API endpoint to login a user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.findUserByEmail(email);
    if (user && user.password_hash === password) {
      req.session.user = user;
      logger.info('Login successful');
      res.json({ message: 'Login successful', user });
    } else {
      logger.warn('Invalid credentials');
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// API endpoint to get tweets for a logged-in user
app.get('/api/tweets', async (req, res) => {
  const userId = req.session.user.id;

  try {
    const tweets = await TweetService.findTweetsByUserId(userId);
    logger.info('Tweets fetched successfully');
    res.json({ message: 'success', data: tweets });
  } catch (err) {
    logger.error(`Error fetching tweets: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
