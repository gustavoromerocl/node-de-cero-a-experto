const { response } = require('express')

const usuariosGet = (req, res =  response) => {
  res.json({
    msg: 'get API - controlador'
  })
}

const usuariosPut = (req, res = response) => {
  res.json({
    msg: 'put API - controlador'
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