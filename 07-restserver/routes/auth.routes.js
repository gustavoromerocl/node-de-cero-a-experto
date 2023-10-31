const { Router } = require('express')
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validation-pipe');

const router = Router()

router.post('/login', [
    check('mail', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validarCampos
], login)

router.post('/google', [
    check('id_token', 'The token is required').not().isEmpty(),
    validarCampos
], googleSignIn)


module.exports = router;