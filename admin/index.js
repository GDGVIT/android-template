var express = require('express');
var config=require('./config.js');
var multer=require('multer');
var storage=multer.diskStorage({
  destination:function (req,file,cb) {
    cb(null,'./upload')
  },
  filename:function (req,file,cb) {
    cb(null,file.filename+'-'+Date.now())
  }
});
var upload=multer({storage:storage});
var middleware=require('../middleware/adminAuth.js');
var model=require('../items/model.js');
var admin=express.Router();
admin.post('/',function (req,res,next) {
console.log("username"+req.body.username);
console.log("password"+req.body.password);
  if(config.username==req.body.username&&config.password==req.body.password){
   res.json({token:config.token})
  //res.json({error:"invalid au"})
  }else {
       //res.json({token:"poda"})
    //  res.json({error:"invalid au"})
    next({status:403,error:1,description:'invalid authentication'})
  }

})
admin.all('/add',middleware.auth);
admin.post('/add',function (req,res,next) {
model.create(req.body,function (err) {
  if(err){
    next({status:403,description:'send valid data'})
   }else {
  res.json({status:'sucess',description:'item created sucessfull'});
 }

});
})
admin.post('/addfile/',require('body-parser').urlencoded({extended:false}),require('skipper')(),function (req,res,next) {
model.upload(req,res,next);

})
module.exports=admin
