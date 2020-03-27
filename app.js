const mongoose= require('mongoose');
const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.routes');
const mongodb = require('./mongoDb/mongodb.connect');
var router = express.Router();

mongodb.connect();
app.use(express.json());
app.use(router);

app.use('/', todoRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({message: error.message});
})
module.exports = app;