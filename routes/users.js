const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const userController=require('../Controllers/userController');

//register
router.post('/register', (req,res,next)=> {
    console.log("AAAAAAAAAA")
    let newUser = new User({
        fname: req.body.fname,
        lname:req.body.lname,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password
    });
    console.log(newUser);
    userController.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg: 'Failde to register user'});
        }else{
            res.json({success: true, msg: 'user registered'});
        }
    });
});

//Authenticate
router.post('/authenticate', (req, res, next)=> {
    console.log("ooooo");
    const email= req.body.email;
    const password = req.body.password;

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
              
             // res.header('x-auth-token',token);
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

module.exports = router;