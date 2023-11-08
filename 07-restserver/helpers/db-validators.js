const { Category, Product } = require('../models')
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

const isValidUserById = async (id = '') => {
  const isUserExist = await User.findOne({ id })
  if(isUserExist) throw new Error('This user id isnt valid')
}

const isValidCategoryById = async (id = '') => {
  const isUserExist = await Category.findOne({ id })
  if(isUserExist) throw new Error('This user id isnt valid')
}

const isValidProductById = async (id = '') => {
  const isUserExist = await Product.findOne({ id })
  if(isUserExist) throw new Error('This user id isnt valid')
}

module.exports = { 
  isValidRole,
  isValidEmail,
  isValidUserById,
  isValidCategoryById,
  isValidProductById,
}