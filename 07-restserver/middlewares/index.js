const RoleValidattions = require('../middlewares/roles-validator')
const JWTValidations = require('../middlewares/validation-jwt')
const fieldsValidations = require('../middlewares/validation-pipe')

module.exports = {
  ...RoleValidattions,
  ...JWTValidations,
  ...fieldsValidations
}