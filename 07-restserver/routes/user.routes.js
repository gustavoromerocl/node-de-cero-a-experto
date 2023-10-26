const { Router } = require('express')
const { check } = require('express-validator')
const { isValidRole, isValidEmail, isValidUserById } = require('../helpers/db-validators')

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
} = require('../controllers/usuarios.controller')

const {
  isAdminRole, 
  haveRole, 
  ValidateJWT, 
  validarCampos
} = require('../middlewares')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', [
  check('id', 'The id isnt valid').isMongoId().custom(isValidUserById),
  check('role').custom(isValidRole),
  validarCampos
],usuariosPut)

router.post('/', [
  check('fullName', 'The name is required').not().isEmpty(),
  check('password', 'The password is more than 6 characters').isLength({ min: 6 }),
  check('mail', 'The email isnt valid').isEmail().custom(isValidEmail),
  // check('role', 'The role isnt valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isValidRole),
  validarCampos
], usuariosPost)

router.delete('/:id', [
  ValidateJWT,
  // isAdminRole,
  haveRole('ADMIN_ROLE', 'USER_ROLE'),
  check('id', 'The id isnt valid').isMongoId().custom(isValidUserById),
  validarCampos
], usuariosDelete)

module.exports = router;