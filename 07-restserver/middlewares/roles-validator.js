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

const haveRole = (...roles) => {

  return (req, res = response, next) => {
    if(!req.user) {
      return res.status(500).json({
        msg: 'Error in validate role: Unexpected token'
      })
    }

    if(!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service require someone this roles [ ${roles} ]`
      })
    }

    next()
  }
}

module.exports = {
  isAdminRole,
  haveRole
} 