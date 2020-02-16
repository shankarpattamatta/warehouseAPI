const express = require('express');
const User = require('../db/model/userModel.js');
const router = new express.Router();
router.post('/users',async function(req,res)
{   
try
{
 const userDoc = new User(req.body);
 const token = await userDoc.generateAuthToken();
 console.log(token);
 //await userDoc.save();
 res.status(200).send({userDoc,token});
}
catch(err)
{
    res.status(500).send(err);
}
});
router.get('/users',async function(req,res){
try{
    const users = await User.find({});
    res.status(200).send(users);
}
catch(err)
{
    res.status(500).send(err);
}
});
router.get('/users/:id',async function(req,res){
try{
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
}
catch(err)
{
    console.log('Got in to errroe'+err)
    res.status(500).send(err);
}
});

router.patch('/users/:id',async function(req,res){
    try{
        const allowedUpdates=['name','email','password','age']
        const updates = Object.keys(req.body);
        const result = updates.every(function(value){
            return allowedUpdates.includes(value)
        })
        if(result)
        {
        //The following line directly updates the database by passing the mongoose  
        //const updatedDoc = await  User.findByIdAndUpdate(req.params.id,req.body,{runValidators:true,new:true});
        //In order to run the middleware , use the following code
        const user = await User.findById(req.params.id);
        updates.forEach(function(keyName)
        {
            user[keyName]=req.body[keyName];
          
        })
        await user.save();
        res.status(200).send(user);
        }
        else{
           res.status(500).send('Bad Input!');
        }
    }
       catch(err)
    {
        res.status(500).send(err);

    }
});

router.post('/users/login', async function(req,res){
try {
        const user = await User.findByUserCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        console.log({"user":user,"token":token});
        res.send({user,token});
}
 catch (error) {
    console.log(error);
    res.status(500).send(error);
}
})
module.exports=router;