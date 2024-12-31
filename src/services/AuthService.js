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
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Registration failed');
          }
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
          if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('user', JSON.stringify(data.user));
          }
          return response;
        } catch (error) {
          logger.error(`Login error: ${error.message}`);
          throw error;
        }
      }

      async forgotPassword(email) {
        try {
          const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
          return response;
        } catch (error) {
          logger.error(`Forgot password error: ${error.message}`);
          throw error;
        }
      }
    }

    export default new AuthService();
