var model = require('./schema.js');
var path=require('path'),
mime=require('mime');
exports.create=function (data,cb) {
  var item=new model(data);
  item.save(cb);
}
exports.upload=function (req,res,next) {
     if(model.count({id:req.body.id}).count==0){
         next({status:403,description:'id is not valid'})
     }else {
       req.file('file').upload({dirname:'../../upload'},function (err, uploadedFiles) {
         if (err) return res.send(500, err);
        model.findOneAndUpdate({id:req.body.id},{file_url:uploadedFiles[0].fd},function (err) {
          if (err) {
            next({status:403,description:'error in updating data'})
          }else {
            return res.json({
              sucess:'ok',description:'file uploaded sucessfully'
            });
          }
        })

       });
     }
}

exports.getFile=function (req,res,next) {
model.findOne({id:req.params.id},function (err,item) {
if(err||item==null)return next({status:403,description:'id not found'})
if(item.file_url==null) {return res.json({description:'file not found'});}
else {
  console.log(item.file_url);
  res.setHeader('Content-disposition','attachment;filename='+path.basename(item.file_url))
  res.setHeader('Content-type', mime.lookup(item.file_url));
  res.download(item.file_url)
}
})
}
exports.getItems=function (req,res,next) {
  model.find().exec(function (err,data) {
  if(err)return next({status:403,description:'sowething wentt wrong'})

  return res.json(data)

  })

}
exports.getItem=function (req,res,next) {
  model.findOne({id:req.params.id},function (err,data) {
    if(err)return next({status:403,description:'something went wrong'})

    return res.json(data)
  })
}
