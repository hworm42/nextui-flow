import { getDb } from '../../db.js';

class User {
  constructor({ _id, username, email, password_hash, created_at, role }) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
    this.created_at = created_at;
    this.role = role;
  }

  static async create(userData) {
    const db = await getDb();
    const result = await db.collection('users').insertOne(userData);
    return new User({ ...userData, _id: result.insertedId });
  }

  static async findById(id) {
    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    return user ? new User(user) : null;
  }

  static async findByEmail(email) {
    const db = await getDb();
    const user = await db.collection('users').findOne({ email });
    return user ? new User(user) : null;
  }

  static async findAll() {
    const db = await getDb();
    const users = await db.collection('users').find().toArray();
    return users.map(user => new User(user));
  }

  static async deleteById(id) {
    const db = await getDb();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}

export default User;
