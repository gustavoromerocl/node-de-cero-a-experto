const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { User, Product, Category } = require("../models");

const availableCollections = [
  'users',
  'categories',
  'products',
  'roles'
]

const searchUsers = async (term = '', res = response) => {
  const isMongoId = isValidObjectId(term)

  if (isMongoId) {
    const user = await User.findById(term)
    console.log(user)
    return res.json({
      results: (user) ? [user] : []
    })
  }
  const regex = new RegExp(term, 'i')
  const users = await User.find({
    $or: [{ fullName: regex }, { mail: regex }],
    $and: [{ state: true }]
  })

  return res.json({
    results: users
  })
}

const searchProducts = async (term = '', res = response) => {
  const isMongoId = isValidObjectId(term)

  if (isMongoId) {
    const product = await Product.findById(term).populate('category', 'name')
    console.log(product)
    return res.json({
      results: (product) ? [product] : []
    })
  }
  const regex = new RegExp(term, 'i')
  const products = await Product
    .find({ name: regex, state: true})
    .populate('category', 'name')

  return res.json({
    results: products
  })
}

const searchCategories = async (term = '', res = response) => {
  const isMongoId = isValidObjectId(term)

  if (isMongoId) {
    const category = await Category.findById(term)
    console.log(category)
    return res.json({
      results: (category) ? [category] : []
    })
  }
  const regex = new RegExp(term, 'i')
  const categories = await Category.find({ name: regex, state: true})

  return res.json({
    results: categories
  })
}

const search = (req, res = response) => {
  const { collection, term } = req.params

  if (!availableCollections.includes(collection)) {
    res.status(400).json({
      msg: `The collection ${collection} isnt valid`
    })
  }

  switch (collection) {
    case 'users':
      searchUsers(term, res)
      break;
    case 'categories':
      searchCategories(term, res)
      break;
    case 'products':
      searchProducts(term, res)
      break;
    default:
      res.status(500).json({ msg: 'The search is not implemented' })
  }
}

module.exports = {
  search,
}