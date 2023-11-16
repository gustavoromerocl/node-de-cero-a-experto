const { v4: uuidv4 } = require('uuid')
const path = require('path')

const uploadFile = (
  { file }, 
  validExtensions = ['png', 'jpg', 'jpeg', 'gif'],
  folder = ''
  ) => {
    console.log("FILE", file);
  return new Promise((resolve, reject) => {
    const splitName = file.name.split('.')
    const fileExtension = splitName[splitName.length - 1]

    if (!validExtensions.includes(fileExtension)) {
      return reject(`The file extension ${fileExtension} isnt valid`)
    }

    const tempName = uuidv4() + '.' + fileExtension

    uploadPath = path.join(__dirname, '../uploads/', folder, tempName)

    file.mv(uploadPath, function (err) {
      if (err) {
        return reject(err)
      }

      resolve(tempName)
    });
  })
}

module.exports = {
  uploadFile
}