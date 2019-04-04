const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const config = require('./config')
const Post = require('./models/post');



mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true })
//     .then(() => console.log('MongoDB has started...'))
//     .catch(e => console.log(e))

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// sessions
// app.use(
//     session({
//       secret: config.SESSION_SECRET,
//       resave: true,
//       saveUninitialized: false,
//       store: new MongoStore({
//         mongooseConnection: mongoose.connection
//       })
//     })
//   );
app.use('/publick', express.static('publick'))
app.set('view engine', 'ejs');

// app.get('/favicon.ico',function(req,res){
//     res.sendfile(__dirname+"/onePage/favicon.ico");
// })

app.get('/',function(req,res){
    res.sendfile(__dirname+"/onePage.html");
})
// app.post('/register',urlencodedParser,function(req,res){
//     if (!req.body) return res.sendStatus(400);
//     console.log(req.body);
//     res.render('to-do', {data:req.body});
// })
app.get('/login.ejs',function(req,res){
    res.render('login');
})
app.get('/register.ejs',function(req,res){
    res.render('register');
})
app.post('/register.ejs',urlencodedParser,(req,res)=>{
    const { email,password } = req.body;
    const hash = bcrypt.hashSync("password");
    Post.create({
        email: email,
        password: hash
    }).then(post => console.log(post.id));
    res.render('to-do', {data:req.body});
})
// app.get('/register.ejs',urlencodedParser, (req, res) => {
//     Post.find({})
//       .then(posts => {
//         res.render('/register.ejs', { posts: posts });
//       })
//       .catch(err => {
//         res.status(200).json({ err: err });
//       });
//   });
module.exports = app;