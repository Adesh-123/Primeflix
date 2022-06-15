const jwt= require('jsonwebtoken');

function verify(req,res,next){
    const authtoken = req.headers.token;
   if(authtoken){  
     const token =authtoken.split(" ")[1];
     jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
         if(err) res.status(403).json("token is invalid");
        else{
            req.user=user;
            next(); 
        } 
     })
   }
   else{
       res.status(404).json("No token is given");
   }
}

module.exports=verify;