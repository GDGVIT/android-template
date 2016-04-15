
var express=require('express'),
app=express();
var db=require('./helper/db.js');
db.init();
app.use(require('body-parser').json());

app.get('/', function(req, res) {
res.json({name:'gdg android template project api server',contributor:[{name:'schoolboy',role:'api baker',link:'https://github.com/sch00lb0y'}]})
});
app.listen(4000,function () {
  console.log('server running on port 4000');
})
app.use('/admin',require('./admin'))
app.use('/item',require('./items'))
app.use(require('./error'))
