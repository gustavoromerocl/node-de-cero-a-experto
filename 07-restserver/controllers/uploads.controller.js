const { response } = require("express")
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const loadFiles = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' })
    return;
  }

  console.log('req.files >>>', req.files) // eslint-disable-line
  const { file } = req.files
  const splitName = file.name.split('.')
  const fileExtension = splitName[splitName.length - 1]
  const validExtensions = ['png', 'jpg', 'jpeg', 'gif']

  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      msg: `The file extension ${fileExtension} isnt valid`
    })
  }

  const tempName = uuidv4() + '.' + fileExtension

  uploadPath = path.join(__dirname, '../uploads/' + tempName)

  file.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).json({ err })
    }

    res.send('File uploaded to ' + uploadPath)
  });
}

module.exports = {
  loadFiles
}