const { response } = require("express")
const path = require('path')

const loadFiles = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' });
    return;
  }
  
  console.log('req.files >>>', req.files); // eslint-disable-line
  const { file } = req.files;

  uploadPath = path.join(__dirname, '../uploads/' + file.name);

  file.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).json({err});
    }

    res.send('File uploaded to ' + uploadPath);
  });
}

module.exports = {
  loadFiles
}