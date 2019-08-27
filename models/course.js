const mongoose=require('mongoose');


const courseSchema= mongoose.Schema({
 
  name:{ type:String},
  author:{type:String},
  duration:{type:Number},

  description:{type:String},
  courseImg:{type:String},
  catergory:{type:String},
  subCatergory:{type:String},

  

  /////*********** */
  content1:{type:Array},
  content2:{type:Array},
  content3:{type:Array},

//************* */


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