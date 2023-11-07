const { response } = require('express')
const { Category } = require('../models')

//obtener Categorias - paginado - total - populate
const getCategories = async (req, res = response) => {
  const { limit = 2, skip = 0 } = req.query;
  const query = { state: true }
  const [categories, count] = await Promise.all([
    Category.find(query)
      .limit(+limit)
      .skip(+skip)
      .populate('user', 'fullName'),
    Category.countDocuments(query)
  ])
  res.json({ categories, count })
}

//Obtener categoria - populate
const getCategory = async (req, res = response) => {
  try {
    const { id } = req.params
    res.json(await Category
      .findById(id)
      .populate('user', 'fullName'))
  } catch (error) {
    console.log(error);
  }
}

//Actualizar categoria 
const updateCategory = async (req, res = response) => {
  try {
    const { id } = req.params
    const { _id, ...rest } = req.body
    rest.name = rest.name.toUpperCase()
    rest.user = req.user._id
    res.json(await Category.findByIdAndUpdate(id, rest, { new: true }))
  } catch (error) {
    console.log(error)
  }
}

//Borrar categoria
const deleteCategory = async (req, res = response) => {
  const { id } = req.params

  res.json(await Category.findByIdAndUpdate(id, { state: false }, { new: true }))
}

//Crear categoria
const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase()

  const categoryDB = await Category.findOne({ name })

  if (categoryDB) {
    return res.status(400).json({
      msg: `the category ${categoryDB.name} already exists`
    })
  }

  const data = {
    name,
    user: req.user._id
  }

  const category = new Category(data)

  await category.save()

  res.status(201).json(category)
}

module.exports = {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
}