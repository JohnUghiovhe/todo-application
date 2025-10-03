const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// root - redirect to tasks if logged in, otherwise to login
router.get('/', (req, res) => {
	if (req.session && req.session.userId) return res.redirect('/tasks');
	res.redirect('/login');
});

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.logout);

module.exports = router;
