import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { User } from '../../src/database/models/user.model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    autoIndex: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('User Model', () => {
  it('should create a new user', async () => {
    const user = new User({
      username: 'john_doe',
      email: 'john.doe@example.com',
      role: 'creator',
    });

    const savedUser = await user.save();
    expect(savedUser.username).toBe('john_doe');
    expect(savedUser.email).toBe('john.doe@example.com');
    expect(savedUser.role).toBe('creator');
  });

  it('should not create a user with duplicate email', async () => {
    const user1 = new User({
      username: 'john_doe1',
      email: 'john.doe1@example.com',
      role: 'creator',
    });

    const user2 = new User({
      username: 'john_doe2',
      email: 'john.doe1@example.com',
      role: 'creator',
    });

    user1.setPassword('password123');
    user2.setPassword('password123');
    await user1.save();

    await expect(user2.save()).rejects.toThrow();
  });

  it('should not create a user with invalid email', async () => {
    const user = new User({
      username: 'john_doe',
      email: 'invalid_email',
      role: 'creator',
    });
    
    user.setPassword('password123');

    await expect(user.save()).rejects.toThrow();
  });

  it('should not create a user without a required field', async () => {
    const user = new User({
      username: 'john_doe',
      email: 'john.doe@example.com',
      role: 'creator',
    });
    
    await expect(user.save()).rejects.toThrow();
  });

  it('should validate the password correctly', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      role: 'creator'
    });
    user.setPassword('password123');

    await user.save();

    const isValid = user.validPassword('password123');
    expect(isValid).toBe(true);

    const isInvalid = user.validPassword('wrongpassword');
    expect(isInvalid).toBe(false);
  });
});;