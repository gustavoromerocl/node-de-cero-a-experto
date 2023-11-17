const { Router } = require('express')
const { loadFiles, updateImage, showImage } = require('../controllers/uploads.controller')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares')
const { isValidCollection, isValidUploadFile } = require('../helpers')

const router = Router()

router.post('/', loadFiles)

router.put('/:collection/:id', [
  isValidUploadFile,
  check('id', 'The id isnt MongoId').isMongoId(),
  check('collection').custom( c => isValidCollection(c, ['users', 'products'])),
  validarCampos
], updateImage)

router.get('/:collection/:id', [
  check('id', 'The id isnt MongoId').isMongoId(),
  check('collection').custom( c => isValidCollection(c, ['users', 'products'])),
  validarCampos
], showImage)

module.exports = router