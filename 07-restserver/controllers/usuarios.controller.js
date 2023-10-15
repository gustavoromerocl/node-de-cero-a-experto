const { response, request } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const usuariosGet = async (req = request, res = response) => {
  // const { apiKey = 'no api key' } = req.params
  const { limit = 5, skip = 0 } = req.query;
  const query = { state: true }
  const [users, count] = await Promise.all([
    User.find(query)
      .limit(+limit)
      .skip(+skip),
    User.countDocuments(query)
  ])
  res.json({ users, count })
}

const usuariosPut = async (req, res = response) => {
  const { id } = req.params

  const { _id, password, google, mail, ...rest } = req.body
  if (password) {
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const usuario = await User.findByIdAndUpdate(id, rest)

  res.json({
    msg: 'put API - controlador',
    usuario
  })
}

const usuariosPost = async (req, res = response) => {
  const { fullName, mail, password, role } = req.body
  const user = new User({ fullName, mail, password, role })
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(400).json(errors)

  //Encryptar password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt)

  //Guardar usuario
  await user.save()
  res.json({ user })
}

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params

  //Borrado en duro
  // const user = await User.findByIdAndDelete(id)
  const user = await User.findByIdAndUpdate(id, { state: false })

  res.json({ user })
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}