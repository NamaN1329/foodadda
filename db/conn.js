const mongoose = require("mongoose");
const DB = process.env.DB
mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( () => {
    console.log("connection sucesss")
}).catch((err) => {
    console.log(err);
})

