const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Course=require('../models/course');
const CourseSchema=Course.course;

function decode(req, res, next){
    //const token = req.headers.authorization.split(" ")[1];
   
    const token=req.header('x-auth-token');
    //console.log(token)
   
    const decodeJWT = jwt.verify(token,config.secret);
 
    
    console.log(decodeJWT.user._id)
   
   // return dedecodeJWT;
   return decodeJWT.user._id;


    
  
}


function checkUserAlreadyRegisterd(req,res,next){
    console.log("BBBBBBBBBBB");
    console.log(req.body.courseId);
    try {
        const decodeUserID = decode(req, res, next);
        console.log(decodeUserID);
        
         CourseSchema.find({_id:req.body.courseId,registerUser:decodeUserID})
    .populate("registerUser")

         .then(user=>{
             console.log(user);
             console.log("AAAAAAA")
             if(user.length>=1)
             {
                 const a=typeof(user);
                 console.log(user.length);
                 console.log(a);
            return  res.send("Already User Register this Course");
               // res.send(user)
             }
    else{
        next();
    }

         })
     
      
    } catch (error) {
        
        res.status(401).json({
           
            state: false
        })
    }




}

module.exports={
    checkUserAlreadyRegisterd:checkUserAlreadyRegisterd
    
}