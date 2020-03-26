const mongoose= require('mongoose');

const TodoScheme = new mongoose.Schema({
    title: String,
    done: Boolean
});

const Todo = mongoose.model('Todo', TodoScheme, 'Todo');

module.exports = Todo;
