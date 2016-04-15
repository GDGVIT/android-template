var express=require('express'),
item=express.Router(),
model=require('./model.js')
item.get('/file/:id',function (req,res,next) {
  model.getFile(req,res,next)
})
item.get('/',function (req,res,next) {
  model.getItems(req,res,next)
})
item.get('/:id',function (req,res,next) {
  model.getItem(req,res,next)
})
module.exports=item
