const mongoose=require('mongoose');


const courseSchema= mongoose.Schema({
 
  name:{ type:String},
  author:{type:String},
  duration:{type:Number},
  content:{type:Array},
  description:{type:String},
  courseImg:{type:String},
  catergory:{type:String},
  subCatergory:{type:String},

  url:{type:String},

  registerUser:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
}],
});







module.exports={
  course:mongoose.model('course',courseSchema),
  
}