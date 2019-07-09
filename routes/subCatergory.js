
const express = require('express');
const router = express.Router();
const subCatergory=require('../models/subCatergory');

// add subCatergory
router.post('/addSubCatergory',(req,res,next)=>{
    
    const subCName=req.body.subCatergoryName
    subCatergory
              .findOne({name:subCName})//findone return one object so it check using if block
                                         //if we use find it return array of objects so it can not check whether ia empty using if block
              .then(result=>{
                  if(result){
                      console.log(result.name)
                    res.status(200).json({
                        
                        Message:" That sub Catergory name is already exist"
                    });

                  }
                  else{
                 
                    const newCatergory=new subCatergory({
                    name:req.body.subCatergoryName,
                    catergoryName:req.body.catergoryName
                })
            newCatergory
                .save()
                .then(result=>{
                  res.status(200).json({
                   subCatergoryName:result.name,
                   state:true,
                   Message:" Added sub Catergory Sucessful"
               });
           })
           .catch(err=>{
             res.status(200).json({
                 state:false,
                 Message:" Added sub Catergory Fail",
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


//get subCatergory

router.get('/display',(req,res)=>{
  
    subCatergory.find()
    .exec()
    .then(result=>{
         console.log(result);
         res.json(result)
     })
     .catch(err=>{
         console.log("Sub Catergories detail retriving error:"+err);
     })
 
   
 
 
 })


 //delete sub Catergory

 router.delete('/delete',(req,res)=>{
     
     const subCName=req.body.subCatergoryName
    subCatergory
      .findOne({name:subCName})
      .then(result=>{
          if(result)
          {
              subCatergory
              .deleteMany({name:subCName})
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
              res.send("That Sub Catergory Not Found")
          }

      })
    

      .catch(err=>{
        res.status(200).json({
            
            error:err,
         })

      }) 
      })


 


module.exports=router;