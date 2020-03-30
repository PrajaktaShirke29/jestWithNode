const TodoController = require('../../controller/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mockData/new-todo.json');
const allTodo = require('../mockData/all-todo.json');

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();
TodoModel.findByIdAndDelete = jest.fn();

// jest.mock('../../model/todo.model');

let res, req, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});
let todoId = "5e816e2b0703481dc416a791";

describe("TodoController.updateTodo", () => {
    it("should have a updateTodo Function", () => {
        expect(typeof TodoController.updateById).toBe("function");
    });

    it("Should call TodoModel.updateOne", async () => {
        req.params.id = todoId;
        req.body = newTodo;
        await TodoController.updateById(req, res, next);
            TodoModel.findByIdAndUpdate(req.params.id, newTodo,{
                new: true,
                useFindAndModify: false
            });
        expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, newTodo, {
            new: true,
            useFindAndModify: false
        });
    });

    it("Should return reponse body with 200 status", async () => {
        req.params.id = todoId;
        req.body = newTodo;
        TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
        await TodoController.updateById(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })

    it("should handle error 404", async () => {
        const errorMessage = {message: "Error"};
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await TodoController.updateById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it("should return 404", async () => {

        TodoModel.findByIdAndUpdate.mockReturnValue(null);
        
        await TodoController.updateById(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
})

describe("TodoContoller.getTodos", () =>{
    it("should have a getTodo function", ()=> {
      expect(typeof TodoController.getTodo).toBe("function");
    });

    it("should call TodoModel.find({})", async () => {
        await TodoController.getTodo(req, res, next);
      expect(TodoModel.find).toHaveBeenCalledWith({});
    });

    it("should return response with status 200 and all todos", async () => {
        TodoModel.find.mockReturnValue(allTodo);
        await TodoController.getTodo(req,res,next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodo);
    })
});

describe("TodoController.getTodoById", () => {
    it("should have a getById function", () => {
        expect(typeof TodoController.getTodoById).toBe("function");
    });

    it("Should call todoModel.getById", async () => {
        req.params.id = todoId;
        await TodoController.getTodoById(req,res,next);
        expect(TodoModel.findById).toBeCalledWith({"_id": todoId})
    })

    it("Should return json body with 201 status code", async () => {
        TodoModel.findById.mockReturnValue(newTodo);
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })

    it("Should handle error ", async () => {
        const errorMessage = {message: "Error finding"};
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findById.mockReturnValue(rejectedPromise);
        await TodoController.getTodoById(req, res, next);

        expect(next).toBeCalledWith(errorMessage);
    });

    it("should return 404", async () => {

        TodoModel.findById.mockReturnValue(null);
        
        req.params.id = "5e7e184464deaf16486b4032";
        await TodoController.getTodoById(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })

});

describe('Todo Controller.createTodo', () => {

    beforeEach(() => {
        req.body = newTodo;
    })

    it('Should have a createTodo function', () => {
        expect(typeof TodoController.createTodo).toBe('function');
    });

    it('should call ToDoModel.create', async () => {
        await TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return response 201', async () => {
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req,res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it('should handle error', async () => {
        const errorMessage= {message : "Done Property missing"};
        const rejectedPromise= Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await TodoController.createTodo(req, res, next);

        expect(next).toBeCalledWith(errorMessage);
    })
});

describe('TodoController.deleteTodoById ', () => {

    beforeEach( () => {
        req.params.id = "5e816ed1e87c953474d365a4";
    });

    it('should have create a function ', () => {
        expect(typeof TodoController.deleteTodoById).toBe("function");
    });

    it('should call ToDoModel.deleted', async () => {
        await TodoController.deleteTodoById(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
        
    });
    
    it("Should return reponse body with 200 status", async () => {
        req.body = newTodo;
        TodoModel.findByIdAndDelete.mockReturnValue(newTodo);
        await TodoController.deleteTodoById(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    })

    it("should handle error 404", async () => {
        const errorMessage = {message: "Error"};
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await TodoController.deleteTodoById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it("should return 404", async () => {

        TodoModel.findByIdAndDelete.mockReturnValue(null);
        
        await TodoController.deleteTodoById(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
})
