const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const ValidateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')
  console.log(token)
  if (!token) {
    return res.status(400).json({ msg: 'unexpected token' })
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findById( uid )

    if(!user) {
      return res.status(401).json({
        msg: 'request doesnt have a valid token - user doesnt exist'
      })
    }

    if(!user.state) {
      return res.status(401).json({
        msg: 'request doesnt have a valid token - state false'
      })
    }
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'request doesnt have a valid token'
    })
  }

}

module.exports = {
  ValidateJWT
}