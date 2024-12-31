import logger from '../utils/logger';
    import { getDb, getObjectId } from '../../db.js';

    class AdminService {
      async getUsers() {
        try {
          const db = await getDb();
          const users = await db.collection('users').find({}, { projection: { username: 1, email: 1, created_at: 1, role: 1 } }).toArray();
          return users;
        } catch (error) {
          logger.error(`Error fetching users: ${error.message}`);
          throw error;
        }
      }

      async deleteUser(userId) {
        try {
          const db = await getDb();
          const ObjectId = await getObjectId();
          const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
          if (result.deletedCount === 0) {
            throw new Error('User not found');
          }
        } catch (error) {
          logger.error(`Error deleting user: ${error.message}`);
          throw error;
        }
      }
    }

    export default new AdminService();
