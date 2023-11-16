const { response } = require("express");
const { uploadFile } = require("../helpers");

const loadFiles = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' })
    return;
  }
  console.log('req.files >>>', req.files) // eslint-disable-line
  try {
    // const name = await uploadFile(req.files, ['txt', 'md', 'png'], 'screenshots')
    const name = await uploadFile(req.files, undefined, 'imgs')

    res.json({
      name
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error })
  }
}

const updateImage = async (req, res = response) => {
  const { id, collection } = req.params;
  res.json(id, collection)
}

module.exports = {
  loadFiles,
  updateImage
}