const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const authRoutes = require('./routes/auth');
const toDoRoutes = require('./routes/to-do');
const onePageRoutes = require('./routes/one-page');
const keys = require('./config/keys');
const app = express();
// mongoo connect
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error))
//dev
app.use(cookieParser('some text'));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.use('/publick', express.static('publick'));
app.set('view engine', 'ejs');
// use session
app.use(session({
  secret: keys.skeys,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: keys.mongoURI,
    ttl: 60 * 60
  })
}))
// routes
app.use('/api/auth', authRoutes);
app.use('/api/to-do', toDoRoutes);
app.use('/', onePageRoutes);
module.exports = app