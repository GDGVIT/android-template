var mongoose=require('mongoose');
exports.init=function () {
  mongoose.connect('mongodb://localhost:27017/template')
}
exports.conn=mongoose.createConnection("mongodb://localhost:27017/template")
