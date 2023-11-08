const { Router } = require('express')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validation-pipe');
const { ValidateJWT, isAdminRole } = require('../middlewares');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');
const { isValidProductById, isValidCategoryById } = require('../helpers/db-validators');

const router = Router()

router.get('/', getProducts)

router.get('/:id', [
  //Validar que existe id de la categoria
  check('id', 'The id isnt valid').isMongoId().custom(isValidProductById),
  validarCampos,
], getProduct)

//Cualquier persona con token - privado
router.post('/', [
  ValidateJWT,
  check('name', 'the name is required').not().isEmpty(),
  check('category', 'The id isnt valid').isMongoId(),
  check('category', 'the category is required').not().isEmpty(),
  check('category', 'The id isnt valid').isMongoId().custom(isValidCategoryById),
  validarCampos
], createProduct)

router.put('/:id', [
  ValidateJWT,
  check('id', 'The id isnt valid').isMongoId().custom(isValidProductById),
  validarCampos,
], updateProduct)

router.delete('/:id', [
  ValidateJWT,
  isAdminRole,
  check('id', 'The id isnt valid').isMongoId().custom(isValidProductById),
  validarCampos,
], deleteProduct)




module.exports = router;