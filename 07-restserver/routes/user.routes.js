const { Router } = require('express')
const { 
  usuariosGet, 
  usuariosPut, 
  usuariosPost, 
  usuariosDelete 
} = require('../controllers/usuarios.controller')
const { check } = require('express-validator')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', [
  check('mail', 'The email isnt valid').isEmail(),
] ,usuariosPost)

router.delete('/', usuariosDelete)

module.exports = router;