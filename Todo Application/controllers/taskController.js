const Task = require('../models/task');

exports.listTasks = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = { user: req.session.userId };
    if (status) filter.status = status;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.render('tasks', { tasks });
  } catch (err) {
    next(err);
  }
};

exports.addTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    const task = new Task({ title, user: req.session.userId });
    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    next(err);
  }
};

exports.completeTask = async (req, res, next) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { status: 'completed' });
    res.redirect('/tasks');
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { status: 'deleted' });
    res.redirect('/tasks');
  } catch (err) {
    next(err);
  }
};
