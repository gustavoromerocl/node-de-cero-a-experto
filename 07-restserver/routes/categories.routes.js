const { Router } = require('express')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validation-pipe');
const { ValidateJWT } = require('../middlewares');
const { createCategory } = require('../controllers/categories.controller');


const router = Router()

router.get('/', (req, res) => res.json({ msg: 'get' }))

router.get('/:id', (req, res) => res.json({ msg: 'get id' }))

//Cualquier persona con token - privado
router.post('/', [
  ValidateJWT,
  check('name', 'the name is required').not().isEmpty(),
  validarCampos
], createCategory)

router.put('/:id', (req, res) => res.json({ msg: 'update id' }))
router.delete('/:id', (req, res) => res.json({ msg: 'delete id' }))




module.exports = router;