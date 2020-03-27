const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mockData/new-todo.json');

const endpointUrl = '/';

describe(endpointUrl, () => {
    it("POST " + endpointUrl, async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send(newTodo);
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(newTodo.title);
      expect(response.body.done).toBe(newTodo.done);
    });

    it("Should return error 500 on malformed data with post"+ endpointUrl, async () => {
        const response = await request(app)
          .post(endpointUrl)
          .send({title: "Missing Done Property"});

          expect(response.statusCode).toBe(500);
          expect(response.body).toStrictEqual({
            message: 
            "Todo validation failed: done: Path `done` is required."
          });
    });

    it("GET "+ "/todo", async () => {
      const response = await request(app).get('/todo');
      expect(response.statusCode).toBe(201);
    })
})