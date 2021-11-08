//create express const to use
const express = require("express");
const app = express();

//include dovenv dependency for using config.env file's environment variables
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const PORT = process.env.PORT

app.get('/', (req,res) => {
res.send("This is Home")
})

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})