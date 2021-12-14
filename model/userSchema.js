const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})

/// password hash by bcryptjs
userSchema.pre('save',async function(next){
if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,12);
}
next();
})

//create web token by jsonwebtoken
userSchema.methods.generateAuthToken  = async function(){
    try{
        let token = jwt.sign({ _id :this._id},process.env.SECRET_KEY);
        this.token = this.tokens.concat({token:token}) 
        await this.save()
        return token
    }
    catch(err){
        console.log(err)
    }
}


///otp table

const PwdSchema = mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      required: true,

    }

  });

 const UserOtp = mongoose.model('usersotp', PwdSchema);

const User = mongoose.model("USERS",userSchema);
module.exports = {User, UserOtp };