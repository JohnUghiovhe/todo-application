const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');
const Task = require('../models/task');

let userId;
let agent;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await User.deleteMany({});
  await Task.deleteMany({});
  agent = request.agent(app);
  // Register and login a user
  await agent.post('/register').send({ username: 'taskuser', password: 'taskpass' });
  const user = await User.findOne({ username: 'taskuser' });
  userId = user._id;
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task Routes', () => {
  test('Add a new task', async () => {
    const res = await agent.post('/tasks/add').send({ title: 'Test Task' });
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/tasks');
  });

  test('List tasks', async () => {
    const res = await agent.get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Test Task');
  });

  test('Complete a task', async () => {
    const task = await Task.findOne({ title: 'Test Task', user: userId });
    const res = await agent.post(`/tasks/${task._id}/complete`);
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/tasks');
    const updatedTask = await Task.findById(task._id);
    expect(updatedTask.status).toBe('completed');
  });

  test('Delete a task', async () => {
    const task = await Task.findOne({ title: 'Test Task', user: userId });
    const res = await agent.post(`/tasks/${task._id}/delete`);
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/tasks');
    const updatedTask = await Task.findById(task._id);
    expect(updatedTask.status).toBe('deleted');
  });
});