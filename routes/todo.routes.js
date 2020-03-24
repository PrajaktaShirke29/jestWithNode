const express= require('express');
const todoController = require('../controller/todo.controller');
const router = express.Router();

router.post('/', todoController.createTodo);
router.get('/todo', todoController.getTodo);

module.exports= router;
