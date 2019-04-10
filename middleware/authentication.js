const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cookieParser('secret'))
app.use(session({keys: ['st']}))
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy((email, password, done) =>{
    if(email !== 'admin'){
        return done(null, false)
    }
    if(password !== 'admin'){
        return done(null, false)
    }
    return done(null,{ firstname: 'Vasya', lastname:'Pupkin', email:'admin', id:1})
}))
passport.serializeUser((user, done) =>{
    done(null, user.id)

})

passport.deserializeUser((id, done) =>{
    done(null,{ firstname: 'Vasya', lastname:'Pupkin', email:'admin', id:1} )
    
})
const auth = passport.authenticate('local', {
    successRedirect: "/toDo",
    failureRedirect: "/login"
})
app.get('/login', (req,res) =>{
    res.send('toDo:login form')
})
app.post('/login', auth)


app.listen(5000)