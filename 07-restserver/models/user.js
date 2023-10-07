const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  fullName: {
    type: String,
    required: [ true, 'The fullname is required']
  },
  mail: {
    type: String,
    unique:true,
    required: [ true, 'The mail is required']
  },
  password: {
    type: String,
    required: [ true, 'The password is required']
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    unique:true,
    required: [ true, 'The role is required'],
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

module.exports = model('Users', UserSchema)