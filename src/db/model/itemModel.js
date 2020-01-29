// This file is created to define a model for the warehouse user who can create ,update, delete products
//Also this file will declare the static methods that can be called on the schema as well as the instance methods that are independent to all the instances.
const mongoose = require('mongoose');
const validator = require('validator');
//create a model which inturn creates the schema object 
//Each schema maps to a mongodb collection 

const itemSchema = mongoose.Schema({
    itemname: {
        type: String,
        required: true,
        trim: true
    },
    itemId: {
        type: Number,
        unique:true,
        //custom validator In stead of below definition simply write in ES6 as follows
        //validate :function(value)
        validate(value) {
            if (value <= 0) {
                throw new Error('Wrong Item Id');
            }
        },
        trim: true

    },
    itemCategory:
    {
        type: String,
        required: true,
        trim: true
    },
    itemCount: {
        type: Number,
        required: true,
        },
    itemBrand: {
            type: String,
            required: true,
            trim: true
        },
    itemPrice:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        trim: true
    },
    AddedBy:{
        type:String,
        required:true,
        trim: true
    }
});

//create a model and export this model as a const 
const itemModel = mongoose.model('itemModel',itemSchema);
module.exports=itemModel;
