var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/publick', express.static('publick'))
app.set('view engine', 'ejs');

app.get('/favicon.ico',function(req,res){
    res.sendfile(__dirname+"/onePage/favicon.ico");
})

app.get('/',function(req,res){
    res.sendfile(__dirname+"/onePage.html");
})
app.post('/register',urlencodedParser,function(req,res){
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.render('to-do', {data:req.body});
})
app.get('/register.ejs',function(req,res){
    res.render('register');
})
app.get('/login.ejs',function(req,res){
    res.render('login');
})

app.listen(3000);
