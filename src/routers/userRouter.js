const express = require('express');
const User = require('../db/model/userModel.js');
const router = new express.Router();
router.post('/users',async function(req,res)
{
try
{
 const userDoc = new User(req.body);
 await userDoc.save();
 res.status(200).send(userDoc);
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
        const allowedUpdates=['password']
        const updates = Object.keys(req.body);
        const result = updates.every(function(value){
            return allowedUpdates.includes(value)
        })
        const updatedDoc = await  User.findByIdAndUpdate(req.params.id,req.params.body,{runValidators:true,new:true});
        res.status(200).send(updatedDoc);

    }
    catch(err)
    {
        res.status(500).send(err);

    }
});


module.exports=router;