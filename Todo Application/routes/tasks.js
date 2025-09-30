const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/', ensureAuthenticated, taskController.listTasks);
router.post('/add', ensureAuthenticated, taskController.addTask);
router.post('/:id/complete', ensureAuthenticated, taskController.completeTask);
router.post('/:id/delete', ensureAuthenticated, taskController.deleteTask);

module.exports = router;