const { response } = require("express")

const loadFiles = (req, res = response) => {
  res.json({
    msg: 'Hola mundo'
  })
}

module.exports = {
  loadFiles
}