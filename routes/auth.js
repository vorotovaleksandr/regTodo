const express = require('express');
const controller = require('../controllers/auth')
const router = express.Router()
// localhost:5000/api/auth/login
router.post('/login', controller.login)
router.get('/login', (req, res) => {
  res.render('login');
})
// localhost:5000/api/auth/register
router.post('/register', controller.register)
router.get('/register', (req, res) => {
  res.render('register');
})

module.exports = router