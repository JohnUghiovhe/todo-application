const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('auth/login');
};

exports.postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.render('auth/login', { error: 'Please provide username and password' });
    }
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('auth/login', { error: 'Invalid credentials' });
    }
    req.session.userId = user._id;
    res.redirect('/tasks');
  } catch (err) {
    next(err);
  }
};

exports.getRegister = (req, res) => {
  res.render('auth/register');
};

exports.postRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.render('auth/register', { error: 'Please provide username and password' });
    }
    if (password.length < 6) {
      return res.render('auth/register', { error: 'Password must be at least 6 characters' });
    }
    const exists = await User.findOne({ username });
    if (exists) {
      return res.render('auth/register', { error: 'Username already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/tasks');
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
