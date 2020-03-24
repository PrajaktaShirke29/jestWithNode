const mongoose= require('mongoose');

const TodoScheme = new mongoose.Schema({
    title: String,
    done: String
});

const Todo = mongoose.model('Todo', TodoScheme, 'Todo');

module.exports = Todo;
