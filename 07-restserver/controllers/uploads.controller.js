const fs = require('fs')
const path = require('path')
const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

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
      if (!model) {
        return res.status(400).json({
          msg: 'The user isnt exists'
        })
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: 'The product isnt exists'
        })
      }
      break;

    default:
      res.status(400).json({ msg: 'The collection isnt valid' })
      break;
  }
  if (model.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img)
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg)
    }
  }
  const filename = await uploadFile(req.files, undefined, collection);
  model.img = filename
  await model.save()
  res.json(model)
}

const showImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: 'The user isnt exists'
        })
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: 'The product isnt exists'
        })
      }
      break;

    default:
      res.status(400).json({ msg: 'The collection isnt valid' })
      break;
  }
  console.log(model)
  if (model.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img)
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg)
    }
  }

  res.json({ msg: 'whitout placeholder' })
}

module.exports = {
  loadFiles,
  updateImage,
  showImage
}