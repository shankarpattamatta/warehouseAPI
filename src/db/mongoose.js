//This javascript file has the connection creation information to the retail warehouse database.

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/retail_warehouse',{
useNewUrlParser:true,
useCreateIndex:true
});