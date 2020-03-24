const mongoose= require('mongoose');
const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo.routes');
const mongodb = require('./mongoDb/mongodb.connect');
const bodyParser=require("body-parser");
const cors=require("cors");
var router = express.Router();
// const Todo = require('./model/todo.model')

mongodb.connect();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);
app.use(bodyParser.json());
app.use(cors())
app.use('/', todoRoutes);

module.exports = app;