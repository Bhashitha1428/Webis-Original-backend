const bcrypt=require('bcryptjs');
const config = require('../config/database');
const User=require('../models/user');


function getUserById (id, callback){
    User.findById(id, callback);
}

 function getUserByEmail (email, callback){
    const query = {email: email}
    User.findOne(query, callback);
}


// function getUserByEmail (email){
//     console.log("zjhczdkh");
//     const query = {email:email}
//     User
//     .findOne(query)
//     .then(user=>{
//         console.log(user);
//         return user;
        
//     })
//     .catch(err=>{
//         console.log("Error"+err);
//     })
// }


// module.exports.addUser = function(newUser, callback){
    
   
//     // bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, 10, (err, hash) => {
            
//            if(err) throw err;
//             newUser.password = hash;
//             newUser.save(callback);
//         });
//     // });
// }

 function comparePassword(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
        }
    )}


    ///////////////////////////////

    /* user register*/
    function registerUser(req, res){
    User
    .find({ email: req.body.email })
    .exec()
    .then(user => { 
        if(user.length >= 1){
            console.log('user exist');
            return res.status(409).json({
                state: false,
                exist: true,
                Message:"use exist"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({     
                    });
                }else {
                    let newUser = new User({
                        fname: req.body.fname,
                        lname:req.body.lname,
                        email: req.body.email,
                        role: req.body.role,
                        password: hash,
                    })
                     newUser.save()
                        .then(result => {
                            console.log("User signed up"); 
                                res.status(201).json({
                                state: true,
                                exist: false,
                                Message:"User Register Sucessful",
                            
                            });
                           
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err,
                                state: false,
                                Message: "Some Validation Errors"
                            });
                        });
                }
            });
        }
    })
    .catch(err=>{
       res.status(500).json({
           state:false,
           error:err
       })


    })

    }





    //check if user is exist
function checkUserIfExist(req, res, next){
    const userId = req.params.userId;
    User
        .find({ _id: userId })
        .exec()
        .then(user => {
            if(!user){
                res.status(500).json({
                    state: false
                })
            } else{
                next()
            }
        })
        .catch(err => {
            res.status(500).json({
                state: false,
                Message: "User Not Exist"
            })
        })
}





    module.exports={
        registerUser:registerUser,
        getUserByEmail:getUserByEmail,
        comparePassword:comparePassword,
        getUserById:getUserById,
        checkUserIfExist:checkUserIfExist,
        
    }