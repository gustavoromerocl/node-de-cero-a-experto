const { response } = require("express");
const { uploadFile } = require("../helpers");

const loadFiles = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' })
    return;
  }
  console.log('req.files >>>', req.files) // eslint-disable-line
  const name = await uploadFile(req.files)
  
  res.json({
    name
  })
}

module.exports = {
  loadFiles
}