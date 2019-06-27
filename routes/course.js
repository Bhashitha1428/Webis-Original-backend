const express=require('express');
const router=express.Router();
const courseSchema=require('../models/course');

const checkAuth=require('../middlewares/check-auth');

//custom middleware
//const auth=require('../middlewares/auth');
//const authrole=require('../middlewares/authrole');



const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./uploads/')
    },
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
    
})

/** My own file validation */

// const myfileFilter=(req,file,callback)=>{
  
//     if(file.mimetyoe =='image/jpeg' || file.mimetyoe=='image/jpg'){
//     callback(new Error("File Type not valid"),false)
   
    
//     }else{
//         callback(null,true)
    
//     }
// }


const upload=multer({storage:storage,
    limits:{
    fileSize:1024*1024*10  //max fileSize 10Mb
}//,
//fileFilter:myfileFilter
});





//get course
router.get('/display',async(req,res)=>{
  
   courseSchema.find()
   .exec()
   .then(course=>{
        console.log(course);
        res.json(course)
    })
    .catch(err=>{
        console.log("Course detail retriving error:"+err);
    })

  //let course= await courseSchema.find({registerUser:"5d02f6aca2f9bc27742a122c"})
  //.populate('registerUser','name -_id')
  //.select()
  //select({name:1,id:1}).limit(4).sort({name:1})
  //res.json(course);


})


//store course

//courseController.validateCourse
router.post('/store',upload.single('courseImg'), (req,res)=>{
    console.log("BBBBB")
   //console.log(req.file);
  
    
    const newCourse=new courseSchema;
    newCourse.name=req.body.name;
    newCourse.author=req.body.author;
    newCourse.duration=req.body.duration;
    newCourse.content=req.body.content;
    newCourse.description=req.body.description;

    newCourse.url=req.body.url;
    newCourse.courseImg=req.file.path;
    newCourse.registerUser=req.body.objectId;



    newCourse.save()
    .then(result=>{
        res.json(result)
        console.log(result);
    })
    .catch(err=>{
      
        res.json(err);
    })

//    let course= await newCourse.save()
//      if(course){
//          res.json(course);
//          console.log("Registration Sucessful");
//      }
//      else{
//          console.log("registration error");
//      }

})

//update exsiting course

router.put('/update/:id', async (req, res) => {
    console.log("IN course update Route");
    const c= await courseSchema.findByIdAndUpdate(req.params.id, {
         name: req.body.name ,
         author:req.body.author ,
         duration:req.body.duration, 
         content:req.body.content,
         description:req.body.description

    
    },{
      new:true //return course with updated values
    })
    .exec()
    .then(course=>{
      res.json(course)
     
   
    })
    .catch(err=>{
      console.log(err);
    })
    


    // const course = await courseSchema.findByIdAndUpdate(req.params.id, {
    //      name: req.body.name ,
    //      author:req.body.author ,
    //      duration:req.body.duration, 
    //      content:req.body.content,
    //      description:req.body.description

    
    // }, {
    //   new: true
    // });
  
    // if (!course) return res.status(404).send('The Course with the given ID was not found.');
    
    // res.send(course);

  

  });


  // delete existing course
  //[auth,authrole]
  router.delete('/delete/:id',checkAuth.checkIfContentProvider, async (req, res) => {
    console.log("IN course delete Route");
    const course = await courseSchema.findByIdAndRemove(req.params.id);
  
    if (!course) return res.status(404).send('The Course with the given ID was not found.');
  
    res.send(course);
  });



  //register users in particular course
  router.post('/register/:id', async (req, res) => {
    console.log("IN  register course route");
    const newUser=req.body.userId;
  
    const course = await courseSchema.findById(req.params.id)
      course.registerUser.push(newUser)
      course.save();
         
 if (!course) return res.status(404).send('The Course with the given ID was not found.');
    
    res.send(course);
  });




//get register user details in particular course
router.get('/registerUser',(req,res)=>{
  courseSchema.find({_id:req.body.courseId})
  .populate("registerUser",'name -_id')//name-_id means display registeruser name without his id
  .select('registerUser name')
  .then(result=>{
    res.json(result)
  })
  .catch(err=>{
     res.json(err)
  })


})

  
module.exports=router;