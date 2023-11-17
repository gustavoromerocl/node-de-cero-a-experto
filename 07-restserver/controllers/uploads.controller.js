const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User } = require("../models");

const loadFiles = async (req, res = response) => {
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

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if(!model) {
        return res.status(400).json({
          msg: 'The user isnt exists'
        })
      }
      break;
  
    default:
      res.status(400).json({msg: 'The collection isnt valid'})
      break;
  }

  const filename = await uploadFile(req.files, undefined, collection);
  model.img = filename
  await model.save()
  res.json(model)
}

module.exports = {
  loadFiles,
  updateImage
}