const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => {
  const isRoleExist = await Role.findOne({ role })
  if (!isRoleExist) throw new Error('The role isnt valid')
}

const isValidEmail = async (mail = '') => {
  const isEmailExist = await User.findOne({ mail })
  if(isEmailExist) throw new Error('This email already exist')
}
module.exports = { 
  isValidRole,
  isValidEmail 
}