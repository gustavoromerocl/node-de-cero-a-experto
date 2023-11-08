const { response } = require("express");


const search = (req, res = response) => {
  res.json({
    msg: 'buscar'
  })
}

module.exports = {
  search,
}