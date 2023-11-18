const fs = require('fs')
const path = require('path')
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

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

const updateImageCloudinary = async (req, res = response) => {
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
    const nameArr = model.img.split('/')
    const name = nameArr[nameArr.length - 1]
    const [public_id] = name.split('.')
    await cloudinary.uploader.destroy(public_id)
  }
  try {
    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
    model.img = secure_url
    await model.save()
    res.json(model)
  } catch (error) {
    console.log(error)
  }

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

  if (model.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img)
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg)
    }
  }
  const pathImage = path.join(__dirname, '../assests/no-image.jpg')
  res.sendFile(pathImage)
}

module.exports = {
  loadFiles,
  updateImage,
  showImage,
  updateImageCloudinary
}