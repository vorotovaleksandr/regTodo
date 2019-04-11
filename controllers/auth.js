const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../routes/utils/errorHandler')



module.exports.login = async function(req,res) {
    const candidate = await User.findOne({email:req.body.email})

    if (candidate) {
        //check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult) {
            // Generation token
            // const token = jwt.sign({
            //     email: candidate.email,
            //     userId: candidate._id
            // }, keys.jwt ,{expiresIn:60 * 60})
            res.status(200).json({
                userId: candidate._id
                
                // token: `Bearer ${token}`
            })
        }else {
            res.status(401).json({
               message: 'User unautorize.'
            })
        }
    }else{
        // user not found, alert
        res.status(404).json({
            message: 'user not found'
        })
    }
}


module.exports.register = async function(req,res) {
    //email password
    
    const candidate = await User.findOne({email:req.body.email})

    if(candidate) {
        //user use again
        res.status(409).json({
            message: 'such an email is already taken'
        })
    }else{
        // created user
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
        await user.save()
        res.status(201).json(user)
        } catch(e) {
          errorHandler(res, e)

        }
    }
}