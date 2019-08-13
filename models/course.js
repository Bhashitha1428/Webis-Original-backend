const mongoose=require('mongoose');


const courseSchema= mongoose.Schema({
 
  name:{ type:String},
  author:{type:String},
  duration:{type:Number},
 // content:{type:Array},
  description:{type:String},
  courseImg:{type:String},
  catergory:{type:String},
  subCatergory:{type:String},

  url:{type:String},

  registerUser:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
}],

content:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:'content'
}]
});


const contentSchema=mongoose.Schema({
  name:{type:String},
  url:{type:String}
})







module.exports={
  course:mongoose.model('course',courseSchema),
  content:mongoose.model('content',contentSchema)
  
}