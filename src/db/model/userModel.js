// This file is created to define a model for the warehouse user who can create ,update, delete products
//Also this file will declare the static methods that can be called on the schema as well as the instance methods that are independent to all the instances.
const mongoose = require('mongoose');
const validator = require('validator');
require('../../db/mongoose.js');
//create a model which inturn creates the schema object 
//Each schema maps to a mongodb collection 

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        //custom validator In stead of below definition simply write in ES6 as follows
        //validate :function(value)
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }

    },
    password:
    {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw Error('Password shoud not include the given text');
            }
        }
    },
    email: {
        type: String,
        unique:true,
        required: true,
        lowercase:true,
        validate(value) {
            if (validator.isEmail(value) === false) {
                throw new Error('Please enter a valid email!');
            }
        }

    },
    tokens:[
        {
            token:{
                type: String,
                
            }
        }
    ]
});


//create a model and export this model as a const 
const userModel = mongoose.model('users',userSchema);
// const me = new userModel({
//     name:'umashankar',
//     age:'27',
//     password:'Cricket@123',
//     email:'shankar.pattamatta@gmail.com'
    
// });
// me.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
//   });
module.exports=userModel;
