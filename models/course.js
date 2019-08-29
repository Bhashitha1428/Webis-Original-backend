const mongoose=require('mongoose');


const courseSchema= mongoose.Schema({
 
  name:{ type:String},
  author:{type:String},
  duration:{type:String},//lessmonth,1-3month,3+month
  
  duration2:{type:String},

  description:{type:String},
  courseImg:{type:String},
  catergory:{type:String},
  subCatergory:{type:String},

  stars:{type:Number},//for count rating
  count:{type:Number},//for count rating

  type:{type:String},// paid course or free course
  skillLevel:{type:String} ,//beginner,intermediate,advanve

  permission:{type:Boolean},
  

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