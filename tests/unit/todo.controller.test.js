const TodoController = require('../../controller/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mockData/new-todo.json');
const allTodo = require('../mockData/all-todo.json');
const updateTodo = require('../mockData/update-todo.json')

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndRemove = jest.fn();

let res, req, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("TodoController.updateTodo", () => {
    it("should have a updateTodo Function", () => {
        expect(typeof TodoController.updateById).toBe("function");
    });

    // it("Should call TodoModel.updateOne", async () => {
    //     TodoModel.findByIdAndUpdate.mockReturnValue(allTodo);
    //     await TodoController.updateById(req, res, next);
    //     expect(TodoModel.findByIdAndRemove).toHaveBeenCalledWith({});
    // });

    // it("Should return reponse body", async () => {
    //     TodoModel.updateOne.mockReturnValue(updateTodo);
    //     await TodoController.updateById(req, res, next);

    //     expect(res.statusCode).toBe(201);
    //     // expect(res.body).toBe(1);
    // })
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
        req.params.id = "5e7e182b500aab2f6cfe41c5";
        await TodoController.getTodoById(req,res,next);
        expect(TodoModel.findById).toBeCalledWith({"_id":"5e7e182b500aab2f6cfe41c5"})
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
