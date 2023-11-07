const { Router } = require('express')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validation-pipe');
const { ValidateJWT, isAdminRole } = require('../middlewares');
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');
const { isValidCategoryById } = require('../helpers/db-validators');


const router = Router()

router.get('/', getCategories)

router.get('/:id', [
  //Validar que existe id de la categoria
  check('id', 'The id isnt valid').isMongoId().custom(isValidCategoryById),
  validarCampos,
], getCategory)

//Cualquier persona con token - privado
router.post('/', [
  ValidateJWT,
  check('name', 'the name is required').not().isEmpty(),
  validarCampos
], createCategory)

router.put('/:id', [
  ValidateJWT,
  check('id', 'The id isnt valid').isMongoId().custom(isValidCategoryById),
  validarCampos,
], updateCategory)

router.delete('/:id', [
  ValidateJWT,
  isAdminRole,
  check('id', 'The id isnt valid').isMongoId().custom(isValidCategoryById),
  validarCampos,
], deleteCategory)




module.exports = router;