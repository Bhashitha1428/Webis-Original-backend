const mongoose=require('mongoose');
//const user=require('./user');

const courseSchema=new mongoose.Schema({

  name:{ type:String,},
  author:{type:String,},
  duration:{type:Number},
  content:{type:Array},
  description:{type:String},
  courseImg:{type:String},

  url:{type:String},

  registerUser:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
}],


});


module.exports=mongoose.model('course',courseSchema);