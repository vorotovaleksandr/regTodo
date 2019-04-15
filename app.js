const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const authRoutes = require('./routes/auth')
const toDoRoutes = require('./routes/toDo')
const keys = require('./config/keys')
const app = express()

// mongoo connect
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true },)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))

app.use('/publick', express.static('publick'))
app.set('view engine', 'ejs');
   
//dev
app.use(cookieParser('some text'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(session({
    secret: 'secret node',    
    store: new MongoStore({ 
      url: keys.mongoURI,
    }),
  
  }))

// routes
app.use('/api/auth', authRoutes)

app.use('/api/toDo', toDoRoutes)


app.get('/',function(req,res){
    res.render('onePage');
})

app.get('/api/auth/login',function(req,res){
    res.render('login');
})
app.get('/api/auth/register',function(req,res){
    res.render('register');
})

app.get('/api/toDo', function (req, res) {
    
    if (req.session.username) {       
        res.render('toDo');
    } else {
        res.status(403).send('Access Denied!');
    };
});

module.exports = app