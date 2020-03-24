const TodoController = require('../../controller/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mockData/new-todo.json');

TodoModel.create = jest.fn();

let res, req, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
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
    })
});