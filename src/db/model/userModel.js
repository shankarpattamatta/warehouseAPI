// This file is created to define a model for the warehouse user who can create ,update, delete products
//Also this file will declare the static methods that can be called on the schema as well as the instance methods that are independent to all the instances.
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
require('../../db/mongoose.js');
const jwt = require('jsonwebtoken');

//create a model which inturn creates the schema object - we pay with the model and use query methods on the model.
//Each schema provides the structure of a  mongodb collection , A collection corresponds to a table in relational database
//Keep in mind that , that the collection is created only if it doesnt exist.
//Also using a schema helps us to access middleware functions.

const userSchema = new mongoose.Schema({
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
       // minlength: 7,
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
                required:true
            }
        }
    ]
});
//bcrypt the password before saving the user
userSchema.pre('save', async function(next){
    //here this refers to the document to be saved.
    const user = this;
    console.log('This middleware call runs before every request!!-calling bcrypt');
    if(user.isModified('password')){
      user.password= await bcrypt.hash(user.password,8);
    }
    next();
} );
//Static method are accessible on Model

userSchema.statics.findByUserCredentials = async function(useremail,userpassword){
   
    const user = await userModel.findOne({email:useremail});
   
    if(!user){
        throw new Error('No such user!')
    }
    //bcrypt not working
    //const isMatch = await bcrypt.compare(userpassword,user.password);
    if(userpassword===user.password)
    {
        return user;
    }
    else{
        throw new Error('Unable to Login!!');
    }
}
//Access the middleware function to bcrypt the password before saving 

//Generate AUth Token for every User Instance ;Instance Methods are accessible via objects of model
userSchema.methods.generateAuthToken = async function()
{
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},'Generate a new token');
    user.tokens=user.tokens.concat({token});
    await user.save();
    return token;
} 

const userModel = mongoose.model('users',userSchema);
module.exports=userModel;
