import logger from '../utils/logger';
    import { getDb } from '../../db.js';

    class AuthService {
      async register(username, email, password) {
        try {
          const db = await getDb();
          const result = await db.collection('users').insertOne({ username, email, password_hash: password, created_at: new Date().toISOString(), role: 'user' });
          if (!result.acknowledged) {
            throw new Error('Registration failed');
          }
          return { ok: true };
        } catch (error) {
          logger.error(`Registration error: ${error.message}`);
          throw error;
        }
      }

      async login(email, password) {
        try {
          const db = await getDb();
          const user = await db.collection('users').findOne({ email, password_hash: password });
          if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            return { ok: true };
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          logger.error(`Login error: ${error.message}`);
          throw error;
        }
      }

      async forgotPassword(email) {
        try {
          const db = await getDb();
          const user = await db.collection('users').findOne({ email });
          if (user) {
            // Send password reset instructions
            return { ok: true };
          } else {
            throw new Error('Email not found');
          }
        } catch (error) {
          logger.error(`Forgot password error: ${error.message}`);
          throw error;
        }
      }
    }

    export default new AuthService();
