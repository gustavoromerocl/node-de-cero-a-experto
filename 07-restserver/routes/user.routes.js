const { Router } = require('express')
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
} = require('../controllers/usuarios.controller')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validation-pipe')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', [
  check('fullName', 'The name is required').not().isEmpty(),
  check('password', 'The password is more than 6 characters').isLength({ min: 6 }),
  check('mail', 'The email isnt valid').isEmail(),
  check('role', 'The role isnt valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  validarCampos
], usuariosPost)

router.delete('/', usuariosDelete)

module.exports = router;