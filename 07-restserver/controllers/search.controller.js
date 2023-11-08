const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { User } = require("../models");

const availableCollections = [
  'users',
  'categories',
  'products',
  'roles'
]

const searchUsers = async(term = '', res = response) => {
  const isMongoId = isValidObjectId(term)

  if(isMongoId) {
    const user = User.findById(term)
    res.json({
      results: (user) ? [user] : []
    })
  }
}

const search = (req, res = response) => {
  const { collection, term } = req.params

  if(!availableCollections.includes(collection)) {
    res.status(400).json({
      msg: `The collection ${term} isnt valid`
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
      res.status(500).json({msg: 'The search is not implemented'})
  }
  res.json({
    msg: 'buscar'
  })
}

module.exports = {
  search,
}