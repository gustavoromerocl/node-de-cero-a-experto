const { response, request } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const usuariosGet = (req = request, res = response) => {
  const { apiKey = 'no api key' } = req.params
  res.json({
    msg: 'get API - controlador',
    apiKey
  })
}

const usuariosPut = (req, res = response) => {
  const { id } = req.params

  res.json({
    msg: 'put API - controlador',
    id
  })
}

const usuariosPost = async (req, res = response) => {
  const { fullName, mail, password, role } = req.body
  const user = new User({ fullName, mail, password, role })

  //Verificar si el correo existe

  //Encryptar password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt)

  //Guardar usuario
  await user.save()
  res.json({
    msg: 'get API - controlador',
    user
  })
}

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - controlador'
  })
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}