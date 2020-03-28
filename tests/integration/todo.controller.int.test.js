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
  });
  
  describe("TodoContoller.getTodos", () =>{


    it("GET "+ "/todo", async () => {
      const response = await request(app).get('/todo');
      expect(response.statusCode).toBe(201);
      expect( Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0].title).toBeDefined();
      expect(response.body[0].done).toBeDefined();
    });

    it("GET todo By ID" + "/todo/:id", async () => {
      const id = "5e7e182b500aab2f6cfe41c5";
      const response = await request(app)
                .get(`/todo/${id}`);

      expect(response.statusCode).toBe(201);
      expect(typeof response.body).toBe("object");
      expect(response.body.title).toBeDefined();
      expect(response.body.done).toBeDefined();
    })

    it("return 404 Error", async () => {
      const id = "5e7e184464deaf16486b4032";
      const response = await request(app).get(`/todo/${id}`);

      expect(response.statusCode).toBe(404);
      expect(response.text).toStrictEqual("{\"message\":\"Data Not Found\"}");
    })

})