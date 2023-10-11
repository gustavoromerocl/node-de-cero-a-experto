const Role = require('../models/role')

const isValidRole = async (role = '') => {
  const isRoleExist = await Role.findOne({ role })
  if (!isRoleExist) throw new Error('The role isnt valid')
}

module.exports = { isValidRole }