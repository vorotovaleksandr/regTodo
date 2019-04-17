const bcrypt = require('bcryptjs')
const User = require('../models/User')
const errorHandler = require('../routes/utils/error-handler')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({
    email: req.body.email
  })
  if (candidate) {
    //check password
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      // send session
      const candidateId = candidate._id
      req.session.userId = candidateId
      res.status(201).json(candidateId)
    } else {
      res.status(401).json({
        message: 'User unautorize.'
      })
    }
  } else {
    // user not found, alert
    res.status(404).json({
      message: 'user not found'
    })
  }
}
module.exports.register = async (req, res) => {
  //email password
  const candidate = await User.findOne({
    email: req.body.email
  })
  if (candidate) {
    //user use again
    res.status(409).json({
      message: 'such an email is already taken'
    })
  } else {
    // created user    
    const user = new User({
      email: req.body.email,
      password: req.body.password
    })  
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }
  }
}