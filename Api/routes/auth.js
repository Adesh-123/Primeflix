const router=require('express').Router();
const User=require("../models/User")
const CryptoJS = require("crypto-js");
const jwt =require('jsonwebtoken');

router.post("/register",async(req,res)=>{
    const newuser=new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
        profilepic:req.body.profilepic
    })
    try{
        const useralready = await User.findOne({email:req.body.email});
        if(useralready) return res.status(404).json("User already register with this emailId");
        else{
           const user= await newuser.save();
           return  res.status(201).json(user);
        }
    }
    catch(err){
       return res.status(500).json(err)
    }
    
});

router.post("/login", async(req,res)=>{
  try{ 
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(404).json("NO SUCH USER EXISTS")

    const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if(originalText!== req.body.password) return res.status(404).send("INVALID CREDENTIALS")
    const accesstoken=  jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY,{expiresIn:"5d"});
    const {password,...info}=user._doc;
    return res.status(200).json({...info,accesstoken});
   }catch(err){
     return res.status(500).json(err);
   }
})


module.exports=router;