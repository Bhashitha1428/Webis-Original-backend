const Course=require('../models/course');
const CourseSchema=Course.course;

function decode(req, res, next){
    //const token = req.headers.authorization.split(" ")[1];
   
    const token=req.header('x-auth-token');
   // console.log(token)
    const decodeJWT = jwt.verify(token,config.secret);

    console.log(decodeJWT.user.role);
  
    
    return decodeJWT.user._id;


    
  
}


function checkUserAlreadyRegisterd(req,res,next){
    console.log("BBBBBBBBBBB")
    try {
        const decodeUserID = decode(req, res, next);
        console.log(decodeUserID)
        console.log("BBBBBBBBBBB")
         CourseSchema.find({reregisterUser:decodeUserID})
         .then(user=>{
             if(user)
             {
                 res.send("Already U Register that Course");
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