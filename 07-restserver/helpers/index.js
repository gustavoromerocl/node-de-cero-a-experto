const generateJWT = require("./generate-jwt")
const googleVerify = require("./google-verify")
const dbValidators = require("./db-validators")
const uploadFiles = require("./upload-files")
const isValidUploadFile = require("./file-validator")
isValidUploadFile
module.exports = {
  ...generateJWT,
  ...googleVerify,
  ...dbValidators,
  ...uploadFiles,
  ...isValidUploadFile,
}