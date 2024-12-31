import db from '../../db.js';
import logger from '../utils/logger.js';

class UserService {
  async addUser(user) {
    try {
      const result = await db.addUser(user);
      return result;
    } catch (error) {
      logger.error(`Error adding user: ${error.message}`);
      throw error;
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await db.findUserByEmail(email);
      return user;
    } catch (error) {
      logger.error(`Error finding user by email: ${error.message}`);
      throw error;
    }
  }

  async findUserById(id) {
    try {
      const user = await db.findUserById(id);
      return user;
    } catch (error) {
      logger.error(`Error finding user by ID: ${error.message}`);
      throw error;
    }
  }
}

export default new UserService();
