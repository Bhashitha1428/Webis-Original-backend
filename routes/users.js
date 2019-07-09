const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const config = require('../config/database');
const User = require('../models/user');
const userController=require('../Controllers/userController');
const checkAuth=require('../middlewares/check-auth');


const uploadController=require('../Controllers/uploadController');



//Register User 
router.post('/register', userController.registerUser);

//upload user image for profile
router.post('/uploadUserImage/:userId', uploadController.userImageUpload.single('image'), (req, res, next) => {
    console.log("uploadUserImage")
    const userId = req.params.userId;
    User
        .find({ _id: userId })
        .exec()
        .then(user => {
            console.log("user found")
            cloudinary.uploader.upload(req.file.path, function(result) {
                imageSecureURL = result.secure_url;
                console.log(imageSecureURL)
                //console.log(result)
                user[0].imageURL = imageSecureURL;
                user[0]
                    .save()
                    .then(result => {
                        res.status(200).json({
                            state: true
                        }) 
                    })
            });
        })
        .catch(err => {
            res.status(401).json({
                state: false,
                message:"Errror"
            })
        })
})

//Authenticate
router.post('/authenticate', (req, res, next)=> {
    console.log("ooooo");
    const email= req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);

    userController.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        userController.comparePassword(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch){
              const token = jwt.sign({user: user},config.secret, {
                  expiresIn: 604800 // 1 week 
                
              }
              );
              console.log(token);
              
              res.header('x-auth-token',token);
              res.json({
                  success: true,
                  //token: 'JWT '+token,
                  token: token,
                  user: {
                      id: user._id,
                      name: user.fname,
                      role: user.role,
                      email: user.email,
                      
                  }
              });
          }else{
              return res.json({success: false, msg: 'worng password'})
          }
        });
    });
});

//profile
router.get('/profile',passport.authenticate('jwt',{session:false}), (req, res, next)=> {
    res.json({user:req.user});
});





//Authenticate
// router.post('/authenticate', (req, res, next)=> {
//     console.log("ooooo");
//     const email= req.body.email;
//     const password = req.body.password;

//    const user= userController.getUserByEmail(email)
//         //if(err) throw err;
//         //console.log(user);
//         if(!user){
//             return res.json({success: false, msg: 'User not found'});
//         }

//         userController.comparePassword(password, user.password, (err, isMatch) => {
//           if(err) throw err;
//           if(isMatch){
//               const token = jwt.sign({user: user},config.secret, {
//                   expiresIn: 604800 // 1 week 
                
//               }
//               );
//               console.log(token);
              
//               //res.header('x-auth-token',token);
//               res.json({
//                   success: true,
//                   //token: 'JWT '+token,
//                   token: token,
//                   user: {
//                       id: user._id,
//                       name: user.fname,
//                       role: user.role,
//                       email: user.email,
                      
//                   }
//               });
//           }else{
//               return res.json({success: false, msg: 'worng password'})
//           }
//         });
   
// });



//delete user
router.delete('/delete/:id',checkAuth.checkIfAdmin,userController.checkUserIfExist,(req,res)=>{
    console.log(" In user delete Route");
  const userId=req.params.id;
  
        User
              .findById(userId)
              .then(user=>{
                console.log(user)
              
                   if(!user){
                    res.status(500).json({
                       Message:"Course is not found" ,
                       state:false
                      
                     })
                     }
                      else{
                      
                              User
                                   .deleteOne({_id:userId})
                                   .then(du=>{
                                    res.status(200).json({
                                      user:user,
                                      state:true,
                                      Message:"User was deleted"
                
                                 })
                                     }) 
                     }
                 })
                 .catch(err=>{
                   res.status(500).json({
                        state:false,
                        Message:err
  
                   })
                 })
  
  
  
  })


//get prticular user registered course details by Id
router.get('/:userId', userController.checkUserIfExist, (req, res, next) => {
    const Id = req.params.userId;
    User
        .findById(Id)
        .populate('registerCourse ','name-_id')
        .select('registerCourse')
      
        .exec()
        .then(result => {
            res.status(200).json({
                User: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                state: false
            });
        });
})

 


module.exports = router;