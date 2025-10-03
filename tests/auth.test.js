const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

describe('Auth Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await User.deleteMany({});
  }, 20000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/tasks');
  });

  test('Login with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' });
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/tasks');
  });

  test('Login with invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'wronguser', password: 'wrongpass' });
    expect(res.text).toContain('Invalid credentials');
  });
});
