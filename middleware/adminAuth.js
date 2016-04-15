var config=require('../admin/config.js');
exports.auth=function (req,res,next) {

  if(req.body.token==config.token){
    next();
  }else {
    next({status:403,description:'invalid token'})
  }
}
