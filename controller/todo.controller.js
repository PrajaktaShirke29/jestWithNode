
var mongoose = require("mongoose");
const Todo = require('../model/todo.model');
const TodoModel = mongoose.model("Todo");

const createTodo =  async (request, response, next) => {
    try{
        const createData = await TodoModel.create(request.body);
        response.status(201).json(createData);
    } catch(error)  {
        next(error);
    }
}

const getTodo = async(req, response, next) => {
    try{
        const getData = await TodoModel.find();
        response.status(201).json(getData);
    }catch(err){
        next(err);
    }
}
     


module.exports= {
    createTodo,
    getTodo
}