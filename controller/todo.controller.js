
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
        const getData = await TodoModel.find({});
        response.status(201).json(getData);
    }catch(err){
        next(err);
    }
}

const getTodoById = async(req, res, next) => {
    try{
        const getData = await TodoModel.findById({_id: req.params.id});
        if(getData)
            res.status(201).json(getData);
        else    
            res.status(404).json({message: "Data Not Found"});
    } catch (error){
        next(error);
    }
}
     
const deleteTodoById = async(req, res, next) => {
    try{
        const deleteData = await TodoModel.findByIdAndDelete(req.params.id);
        if(deleteData)
            res.status(201).json(deleteData);
        else
            res.status(404).json({message: "Data Not Found"});
    }catch(error){
        next(error)
    }
}

const updateById = async (req, res, next) => {
    try{
        const updateData = await TodoModel.findByIdAndUpdate(req.params.id,  req.body,{
            new: true,
            useFindAndModify: false
        });
        if(updateData)
            res.status(201).json(updateData);
        else
            res.status(404).json({message: "Data Not Found"})
    } catch(err){
        next(err);
    }
}

module.exports= {
    createTodo,
    getTodo,
    getTodoById,
    deleteTodoById,
    updateById
}