const router=require('express').Router();
const User=require("../models/User")
const Otp=require("../models/Otp");
const CryptoJS=require("Crypto-js");
const verify=require('../Verifytoken');
const nodemailer =require('nodemailer');

// Update user detail
router.put("/:id",verify, async(req,res)=>{
  if(req.user.id===req.params.id || req.user.isAdmin){
      if(req.user.password){
          req.user.password=CryptoJS.AES.encrypt(req.user.password,process.env.SECRET_KEY).toString();
      }
      try{
          const updateuser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
          return res.status(200).json(updateuser);
      }
      catch(err){
         return res.status(500).json(err);
      }
  }
  else{
      return res.status(403).json("you can update only your account");
  }
})

// delete user
router.delete("/:id",verify,async(req,res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("user has been deleted");
        }
        catch{
            return res.status(500).josn(err);
        }
    }
    else{
        return res.status(403).json("you can delete only your account");
    }
})

// get user detail
router.get("/find/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const {password,...info}=user._doc;
        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json(err);
    }
})


// get all users
router.get("/",verify,async(req,res)=>{
    const query = req.query.new;
    if(req.user.isAdmin){
        try{
            const users =  query? await User.find().sort({_id:-1}).limit(3):await User.find();
           return  res.status(200).json(users);
        }
        catch(err){
           return  res.status(500).json(err);
        }       
    }
    else{
        return res.status(403).json("You have not access to see all users");
    }
})

router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return  res.status(200).json(data)
  } catch (err) {
    return res.status(500).json(err);
  }
});

const mailsender=(otp,email)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'watchstarfix@gmail.com',
      pass: 'doigxunrlfvrbrje'
    }
  });
  var mailOptions = {
    from: 'watchstarfix@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: `That was easy! ${otp} valid for 10min`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent:'+ info.response);
    }
  });
}

function generateOTP() {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
router.post("/otpsend", async(req,res)=>{
  const user=await User.findOne({email:req.body.email});
  // res.json(user);
  if(user){
    const otpnum=generateOTP();
    const newOTP=new Otp({
      email:req.body.email,
      otp:otpnum,
      expireIn:new Date().getTime()+1000*60*5
    })
    try{
      const otpdetail=await newOTP.save();
      mailsender(otpnum,req.body.email);
       return res.status(200).json("success");
    }catch(err){
       return res.status(500).json(err);
    }
  }else{
    return res.status(403).json("noUser");
  }
}) 

const deleteOtpuser=async(id)=>{
  const getUser=await Otp.findByIdAndDelete({_id:id});
}
router.post("/otpchecker",async(req,res)=>{
     const user=await Otp.findOne({email:req.body.email});
     if(user){
       const currenttime=new Date().getTime();
       let diff=user.expireIn-currenttime;
      //  console.log(user.otp.toString());
       if(diff>=0){
         if(req.body.otp===user.otp){
           deleteOtpuser(user._id);
           return res.status(200).json("Success");
         }
         else{
           return res.status(401).json("Notmatched");
         }
       }
       else{
         return res.status(401).json("TimeUp");
       }
     }
})

router.put("/update/forget",async(req,res)=>{
  const user=await User.findOne({email:req.body.email})
  // res.send(user);
  req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString();
  try{
    const updateuser=await User.findByIdAndUpdate(user._id,{$set:req.body},{new:true});
    return res.status(200).json(updateuser);
  }
 catch(err){
   return res.status(500).json(err);
 }
})

// router.put("/addlike/:id",verify,async(req,res)=>{
//   if(req.user.id===req.params.id){
//     const userdetail=await User.findOne({id:req.params.id});
//     let s=String(req.body.likeitem);
//     try{
//         // if(userdetail.Liked.length==1) userdetail.Liked.pop();
//          userdetail.Liked.push(s);
//          req.body={Liked: userdetail.Liked};
//         const updateuser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
//         return res.status(200).json(updateuser);
//     }
//     catch(err){
//        return res.status(500).json(err);
//     }
//   }
//   else{
//     return res.status(403).json("you can update only your account");
//   }
// })


// router.put("/deletelike/:id",verify,async(req,res)=>{
//   if(req.user.id===req.params.id){
//     const userdetail=await User.findOne({id:req.params.id});
//     let s=String(req.body.likeitem);
//      const arr=[];
//      for(let i=0;i<userdetail.Liked.length;i++){
//          if(userdetail.Liked[i]!==s){
//            arr.push(userdetail.Liked[i]);
//          }
//      }
//      userdetail.Liked=arr;
//     try{
//       req.body={Liked: userdetail.Liked};
//        const updateuser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
//        return res.status(200).json(updateuser);
//     }catch(err){
//       return res.status(500).json(err);
//     }
//   }
// })


// router.put("/adddislike/:id",verify,async(req,res)=>{
//   if(req.user.id===req.params.id){
//     const userdetail=await User.findOne({id:req.params.id});
//     let s=String(req.body.dislikeitem);
//     try{
//       userdetail.Disliked.push(s);
//        req.body={Disliked: userdetail.Disliked};
//       // res.json(req.body);
//         const updateuser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
//         return res.status(200).json(updateuser);
//     }
//     catch(err){
//        return res.status(500).json(err);
//     }
//   }
//   else{
//     return res.status(403).json("you can update only your account");
//   }
// })

// router.put("/deletedislike/:id",verify,async(req,res)=>{
//   if(req.user.id===req.params.id){
//     const userdetail=await User.findOne({id:req.params.id});
//     let s=String(req.body.dislikeitem);
//      const arr=[];
//      for(let i=0;i<userdetail.Disliked.length;i++){
//          if(userdetail.Disliked[i]!==s){
//            arr.push(userdetail.Disliked[i]);
//          }
//      }
//      userdetail.Disliked=arr;
//     try{
//        req.body={Disliked: userdetail.Disliked};
//        const updateuser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
//        return res.status(200).json(updateuser);
//     }catch(err){
//       return res.status(500).json(err);
//     }
//   }
// })

  module.exports=router;