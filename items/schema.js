var mongoose=require('mongoose')
var db=require('../helper/db.js');
var mongooseAutoIncrement=require('mongoose-auto-increment')
mongooseAutoIncrement.initialize(db.conn);
var Schema=mongoose.Schema;
var itemSchema=new Schema({
  name:{
     type:String,
     required:true
  },
  img1:{
    type:String,
  required:true},
  img2:String,
  img3:String,
  description:String,
  file_url:String
})
itemSchema.plugin(mongooseAutoIncrement.plugin,{
  model:'item',
  field:'id',
  startAt:10,
  incrementBy:5
})
module.exports=mongoose.model('item',itemSchema)
