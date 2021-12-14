const jwt = require("jsonwebtoken");
const Collections = require('../model/userSchema');
const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();
const User = Collections.User;
const UserOtp = Collections.UserOtp;
require('dotenv').config({path:'./config.env'});
const mailer = require("nodemailer"); //for email


require('../db/conn');
router.get('/cookie', (req,res) => {
    res.cookie('cookie_added','this is demo cookie',{
        expires: new Date(Date.now() + 5000),
        httpOnly:true
    })
res.send('This is home from router'+new Date(Date.now() + 50000))
});


/// part 1 Where async await method is used

///register
router.post('/register', async (req,res) => {

    const { name, email,password,phone} = req.body;
if(!name ||  !email || !phone || !password){
    return res.status(422).json({error:"Plz fill the field properly"})
}
try{
    console.log(User);
    ///check already exist or not
 const userExist = await User.findOne({email:email})///first email comes from db column and second 
 
    if(userExist){
        return res.status(403).json({message:"Email Already Exist"});
    }
    console.log("newuserExist")

//otp generator
const otpGenerator = require('otp-generator')

const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });


    //  const user =  new User({name:name, email:email,phone:phone,work:work,password:password,cpassword:cpassword})
    // if key and value is same then you don't have to write like above
    const user = new User({name,email,phone,password});
    const usersotp = new UserOtp({email,otp});
///use pre method as a middleware is used in userSchema page to hashing a password before save
   

const userRegister = await user.save(); //save data in database collection
const userCode = await usersotp.save();
   res.status(200).json({message : "Data Inserted Successfully"});
const emailmsg = `<h2>Your otp is `+otp+`</h2><br>`;
    let body ={ /// email body
        from: 'hariramthapa132999@gmail.com',
        to: email,
        subject: 'This is email verification',
        html: emailmsg,
    }
    const transporter =   mailer.createTransport({
        service: 'gmail',
        auth:{
            user: "hariramthapa132999@gmail.com",
            pass : "#harry@99"
        }
    })

    // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
        console.log(error);
        } else {
        console.log("Server is ready to take our messages");
        }
    });

    transporter.sendMail(body,(err, result) =>{
        if (err) {
            console.log(err);
            return false
        }
        console.log(result);
        console.log("email sent");
    })

}
catch(error){
console.log(error);
}

})


///login route
router.post('/login',async(req,res) => {
    console.log(req.body);
// res.json({message:"THis is signup"});
let token;
try{
const {email,password} = req.body;
if(!email || !password){

    return res.status(400).json({error:"please fill data"})
}
const userLogin = await User.find({email,password});
console.log(userLogin)
if(!userLogin || (userLogin.length < 1)){
    res.status(400).json({message:"No user"})
}
else{

    const isMatch = await bcrypt.compare(password,userLogin.password);

    // const isMatch = 'hye';

    res.cookie('jwtoken','token',{
        expires: new Date(Date.now() + 25892000000), //expire after 30days
        httpOnly:true
    })
    
    if(!isMatch){
        res.status(400).json({error:"wrong credentials"});
    }
    else{
        res.json({ message:"Login Succesfully"});
    }
}


}
catch(err){
console.log(err);
}
});

router.post('/otpCheck',async(req,res) => {
    try{
        const {email,otp} = req.body;
        const checkOtp = await UserOtp.find({email,otp});
        console.log(checkOtp);
        console.log(checkOtp.length);
        if (checkOtp && (checkOtp.length > 0) ) {
            res.status(200).json({message:"verified"})   
        } 
        else {
        res.status(400).json({ message:"failed"});
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({ message:"failed"});
    }
})


module.exports = router;




// // part 2 where promise method used
// router.post('/register', (req,res) => {

//     const { name, email,phone,work,password,cpassword} = req.body;
// if(!name ||  !email || !phone || !work || !password || !cpassword){
//     return res.status(422).json({error:"Plz fill the field properly"})
// }

// ///check already exist or not
// User.findOne({email:email})///first email comes from db column and second 
// .then( (userExist) => {
//     if(userExist){
//         return res.status(422).json({error:"Email Already Exist"});
//     }
// //  const user =  new User({name:name, email:email,phone:phone,work:work,password:password,cpassword:cpassword})
// // if key and value is same then you don't have to write like above
//     const user = new User({name, email,phone,work,password,cpassword});

//     user.save() //save data in database collection
//     .then( () => {
//         res.status(200).json({message : "Data Inserted Successfully"});
//     })
//    .catch( (err) => res.status(500).json({ error:"Failed Registration"}));

    
// } )
// .catch((err) => { console.log(err)

// })
// //     console.log(name);
// //     console.log(email);
// // //   res.send("This is run");
// //       res.json({phone})
// })
// module.exports = router;