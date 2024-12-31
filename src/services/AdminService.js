import logger from '../utils/logger';
import { getDb } from '../../db.js';

class AdminService {
  async getUsers() {
    try {
      const db = await getDb();
      const tx = db.transaction('users', 'readonly');
      const store = tx.objectStore('users');
      const users = await store.getAll();
      await tx.complete;
      return users;
    } catch (error) {
      logger.error(`Error fetching users: ${error.message}`);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const db = await getDb();
      const tx = db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
      const result = await store.delete(parseInt(userId));
      await tx.complete;
      if (!result) {
        throw new Error('User not found');
      }
    } catch (error) {
      logger.error(`Error deleting user: ${error.message}`);
      throw error;
    }
  }
}

export default new AdminService();
