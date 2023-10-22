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
    required: [ true, 'The role is required'],
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

UserSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id
  return user
}

module.exports = model('Users', UserSchema)