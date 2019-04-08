const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const toDoRoutes = require('./routes/toDo')
const keys = require('./config/keys')
const app = express()

// mongoo connect
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true },)
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))

// passport
app.use(passport.initialize())
require('./middleware/passport')(passport)    
//dev
app.use(require('morgan')('dev'))
app.use(require('cors')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/toDo', toDoRoutes)

module.exports = app