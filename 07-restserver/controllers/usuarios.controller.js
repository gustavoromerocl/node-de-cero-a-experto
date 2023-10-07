const { response, request } = require('express')

const usuariosGet = (req = request, res =  response) => {
  const { apiKey = 'no api key' } =  req.params
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

const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body
  res.json({
    msg: 'get API - controlador',
    nombre,
    edad
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