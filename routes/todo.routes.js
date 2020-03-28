const express= require('express');
const todoController = require('../controller/todo.controller');
const router = express.Router();

router.post('/', todoController.createTodo);

router.get('/todo', todoController.getTodo);
router.get('/todo/:id', todoController.getTodoById);

router.delete('/todo/:id', todoController.deleteTodoById);

router.put('/todo', todoController.updateById);
module.exports= router;
