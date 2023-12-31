const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { mail, password } = req.body;
  try {
    const user = await User.findOne({ mail })

    if (!user) {
      return res.status(400).json({
        msg: 'User or passsword isnt valid'
      })
    }

    if (!user.state) {
      return res.status(400).json({
        msg: 'User or passsword isnt valid'
      })
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: 'User or passsword isnt valid - password'
      })
    }

    const token = await generateJWT(user.id)
    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'some was wrong'
    })
  }
}

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body

  try {
    const { name, picture, email } = await googleVerify(id_token)
    let user = await User.findOne({ mail: email })

    if (!user) {
      const data = {
        fullName: name,
        mail: email,
        password: 'password',
        img: picture,
        google: true,
        role: 'USER_ROLE'
      }
      user = new User(data)
      await user.save()
    }

    if(!user.state) {
      return res.status(401).json({
        msg: 'User is unactive'
      })
    }

    res.json({
      user,
      token: id_token
    })
  } catch (error) {
    console.log(error)
  }

}

module.exports = { login, googleSignIn }