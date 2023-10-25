const { response } = require("express")

const isAdminRole = (req, res = response, next) => {
  if(!req.user) {
    return res.status(500).json({
      msg: 'Error in validate role: Unexpected token'
    })
  }

  const { role, fullName } = req.user

  if(role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${fullName} isnt administrator`
    })
  }

  next()
} 

module.exports = {
  isAdminRole
} 