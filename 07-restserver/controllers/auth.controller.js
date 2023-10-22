const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs')

const login = async (req, res = response) => {
  const { mail, password } = req.body;
  try {
    const user = await User.findOne({ mail })

    if(!user) {
      return res.status(400).json({
        msg: 'User or passsword isnt valid'
      })
    }

    if(!user.state) {
      return res.status(400).json({
        msg: 'User or passsword isnt valid'
      })
    }

    const validPassword = bcryptjs.compareSync( password, user.password );

    if(!validPassword) {
      return res.status(400).json({
        msg: 'User or passsword isnt valid - password'
      })
    }

    res.json({
      msg: 'ok',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'some was wrong'
    })
  }
}

module.exports = { login }