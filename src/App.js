//create express const to use
const express = require("express");
const app = express();

//include dovenv dependency for using config.env file's environment variables
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const PORT = process.env.PORT

app.use(express.json());

app.use(require('../router/Auth'));

// include mogoose for db connection
const middleware = (req,res,next) => {
    res.cookie('jwtoken','this is cookie data',{
      expires: new Date(Date.now() + 25892000000), //expire after 30days
      httpOnly:true
    })
  console.log("Hello its middle ware");
  next()
  };
const mongoose = require('mongoose');
app.get('/',middleware, (req,res) => {
res.send("This is Home")
})


app.post('/login', (req,res) => {
    res.status(200).json({message:"This is Home"});
  })

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})