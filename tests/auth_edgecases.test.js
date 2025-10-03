const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

describe('Auth Edge Cases', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});
  }, 20000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Register with short password', async () => {
    const res = await request(app).post('/register').send({ username: 'u1', password: '123' });
    expect(res.text).toContain('Password must be at least 6 characters');
  });

  test('Register with missing fields', async () => {
    const res = await request(app).post('/register').send({ username: '', password: '' });
    expect(res.text).toContain('Please provide username and password');
  });

  test('Duplicate username', async () => {
    await request(app).post('/register').send({ username: 'dupuser', password: 'password1' });
    const res = await request(app).post('/register').send({ username: 'dupuser', password: 'password2' });
    expect(res.text).toContain('Username already taken');
  });

  test('Login with missing fields', async () => {
    const res = await request(app).post('/login').send({ username: '', password: '' });
    expect(res.text).toContain('Please provide username and password');
  });
});
