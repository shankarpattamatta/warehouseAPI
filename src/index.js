const express = require('express');
const mongoose = require('mongoose');
const itemRouter = require('./routers/itemRouter.js');
const userRouter = require('./routers/userRouter.js');

require('./db/mongoose.js');
const app = express();
const port = process.env.PORT||3000;
const User = require('./db/model/userModel');
app.use(express.json());
app.use(itemRouter);
app.use(userRouter);

app.listen(port,function(){ 
    console.log('server is up on port '+port);
});
app.post('/sample',function(req,res){
    res.send('Here is your sample!');
});

