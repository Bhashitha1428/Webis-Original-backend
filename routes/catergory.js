
const express = require('express');
const router = express.Router();
const catergory=require('../models/catergory');

// add Catergory
router.post('/addCatergory',(req,res,next)=>{

    const CName=req.body.catergoryName
    console.log(CName)
       catergory
              .findOne({name:CName})//findone return one object so it check using if block
                                         //if we use find it return array of objects so it can not check whether ia empty using if block
              .then(result=>{
                  if(result){
                      console.log(result.name)
                    res.status(200).json({
                        
                        Message:" That Catergory name is already exist"
                    });

                  }
                  else{
                      
                 
                    const newCatergory=new catergory({
                    name:req.body.catergoryName,
                })
            newCatergory
                .save()
                .then(result=>{
                  res.status(200).json({
                   CatergoryName:result.name,
                   state:true,
                   Message:" Added  Catergory Sucessful"
               });
           })
           .catch(err=>{
             res.status(200).json({
                 state:false,
                 Message:" Added  Catergory Fail",
                 Error:err,
                 
             });
           })
                  }
              })
        .catch(err=>{
            res.status(200).json({
                state:false,
                 Error:err,
                
            });  
        })




})


//get Catergory

router.get('/display',(req,res)=>{
  
    catergory.find()
    .exec()
    .then(result=>{
         console.log(result);
         res.json(result)
     })
     .catch(err=>{
         console.log("Catergories detail retriving error:"+err);
     })
 
   
 
 
 })


 //delete  Catergory

 router.delete('/delete',(req,res)=>{
     
    const CName=req.body.subCatergoryName
   catergory
     .findOne({name:CName})
     .then(result=>{
         if(result)
         {
             catergory
             .deleteMany({name:CName})
             .then(r=>{
                 res.status(200).json({
                    Message:"Delete sucessfully" ,
                    state:true,
                 })
             })
             .catch(err=>{
               res.status(200).json({
                   Message:"Delete Unsucessfully" ,
                   state:false,
                   error:err,
                })

             })
         }
         else{
             res.send("That  Catergory Not Found")
         }

     })
   

     .catch(err=>{
       res.status(200).json({
           
           error:err,
        })

     }) 
     })


module.exports=router;