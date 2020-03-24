
var mongoose = require("mongoose");
const Todo = require('../model/todo.model');
const TodoModel = mongoose.model("Todo");

const createTodo =  async (request, response, next) => {

    await TodoModel.create(request.body, function(err, res){
        if(err)
        {
            response.send({statusCode: 500, error:err });
        }
        response.send({status:200, data: res});
    });

}

const getTodo = async(req, response) => {
    TodoModel.find().exec(function(err, result){
        if(err)
        {
            response.statusCode=500;
            response.send({statusCode: response.statusCode, error:err });
        }
        response.send({statusCode: 200, data:result});
    });
}
     


module.exports= {
    createTodo,
    getTodo
}