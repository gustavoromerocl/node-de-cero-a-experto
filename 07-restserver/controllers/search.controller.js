const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { User } = require("../models");

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
    res.json({
      results: (user) ? [user] : []
    })
  }
  const regex = new RegExp(term, 'i')
  const users = await User.find({
    $or: [{ fullName: regex }, { mail: regex }],
    $and: [{ state: true }]
  })

  res.json({
    results: users
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

      break;
    case 'products':

      break;

    default:
      res.status(500).json({ msg: 'The search is not implemented' })
  }
}

module.exports = {
  search,
}