const express = require('express');
const Item = require('../db/model/itemModel.js');
const router = new express.Router();



/*********************************************************** */

router.get('/sampleRequest',function(req,res){
    res.send('Hello World');
});
router.post('/items',async function(req,res)
{
try
{
 const item = new Item(req.body);
 await item.save();
 res.status(200).send(item);
}
catch(err)
{
    res.status(500).send(err);
}
});
router.get('/items',async function(req,res){
try{
    const items = await Item.find({});
    res.status(200).send(items);
}
catch(err)
{
    res.status(500).send(err);
}
});
router.get('/items/:id',async function(req,res){
    try{
        const item = await Item.findById(req.params.id);
        res.status(200).send(item);
    }
    catch(err)
    {
        console.log('Got in to err'+err)
        res.status(500).send(err);
    }
    });
    router.patch('/items/:id',async function(req,res){
        const allowedUpdates=['itemQuantity','itemPrice'];
        
        try{
            
            const updateKeys =Object.keys(req.body);
           const result =  allowedUpdates.forEach(function(value){
                return allowedUpdates.includes(value);
            });
            if(!result)
            {
                return res.status(500).send(err);
            }
            else
            {
            const updatedItem= await  Item.findByIdAndUpdate(req.params.id,req.params.body,{runValidators:true,new:true});
            res.status(200).send(updatedItem);
            }         
        }
        catch(err)
        {
            res.status(500).send(err);
    
        }
    });
    module.exports=router;