const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config')
const user = require('./models/user');

mongoose.Promise = global.Promise

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

//database
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection
  .on('error', error => console.log(error))
  .on('close', () => console.log('Database connection closed.'))
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  });
mongoose.connect(config.MONGO_URL);


app.use('/publick', express.static('publick'))
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.render('onePage');
})

app.get('/login',function(req,res){
    res.render('login');
})
app.get('/register',function(req,res){
    res.render('register');
})

app.get('/to-do',(req,res)=>{
    res.render('to-do.ejs')
})


//Post Registration
app.post('/register',urlencodedParser,(req,res)=>{
    const { email,password } = req.body;
    const hash = bcrypt.hashSync(password);
    user.create({
        email: email,
        password: hash
    }).then(user => console.log(user.id , user.email));
    res.send( {data:req.body, userId: user });
})
//Post Login
app.post('/login',urlencodedParser,(req,res)=>{
    const { email,password } = req.body;
    console.log('sdsadasaasd',req.body)
    user.findOne({
        email: email
        }).then(user => {
        if(!user){
            res.status(500).send('Something broke!')
        }else{bcrypt.compare(password, user.password, function(err, result) {
            console.log(result,password,user.password,user._id)
             if(result) res.send('ok');
        })
        }
    })
})
// Post to-do
app.post('/to-do.ejs',urlencodedParser,(req,res)=>{
    const  text  = req.body;
    
    const { email,password } = req.body;
    const hash = bcrypt.hashSync(password);
    user.create({
        email: email,
        password: hash
    }).then(user => console.log(user.id , user.email));
    res.render('to-do', {data:req.body, userId: user });
})


app.listen(config.PORT, () => 
    console.log(`Example app listening ${config.PORT}!`)
);