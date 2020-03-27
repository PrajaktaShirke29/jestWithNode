const mongoose= require('mongoose');

const TodoScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
});

const Todo = mongoose.model('Todo', TodoScheme, 'Todo');

module.exports = Todo;
