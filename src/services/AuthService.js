import logger from '../utils/logger';

class AuthService {
  async register(username, email, password) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role: 'user' }),
      });
      return response;
    } catch (error) {
      logger.error(`Registration error: ${error.message}`);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return response;
    } catch (error) {
      logger.error(`Login error: ${error.message}`);
      throw error;
    }
  }
}

export default new AuthService();
