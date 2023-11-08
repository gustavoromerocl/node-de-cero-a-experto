const { response } = require('express');
const { Product } = require('../models');


//obtener Categorias - paginado - total - populate
const getProducts = async (req, res = response) => {
  const { limit = 2, skip = 0 } = req.query;
  const query = { state: true }
  const [products, count] = await Promise.all([
    Product.find(query)
      .limit(+limit)
      .skip(+skip)
      .populate('user', 'fullName')
      .populate('category', 'name'),
    Product.countDocuments(query)
  ])
  res.json({ products, count })
}

//Obtener categoria - populate
const getProduct = async (req, res = response) => {
  try {
    const { id } = req.params
    res.json(await Product
      .findById(id)
      .populate('user', 'fullName')
      .populate('category', 'name'))

  } catch (error) {
    console.log(error);
  }
}

//Actualizar categoria 
const updateProduct = async (req, res = response) => {
  try {
    const { id } = req.params
    const { _id, state, user, ...rest } = req.body
    if (rest.name) rest.name = rest.name.toUpperCase()
    rest.user = req.user._id
    res.json(await Product.findByIdAndUpdate(id, rest, { new: true }))
  } catch (error) {
    console.log(error)
  }
}

//Borrar categoria
const deleteProduct = async (req, res = response) => {
  const { id } = req.params

  res.json(await Product.findByIdAndUpdate(id, { state: false }, { new: true }))
}

//Crear categoria
const createProduct = async (req, res = response) => {
  const { state, user, ...body } = req.body

  const productDB = await Product.findOne({ name: body.name })

  if (productDB) {
    return res.status(400).json({
      msg: `the Product ${productDB.name} already exists`
    })
  }

  const data = {
    name: body.name.toUpperCase(),
    category: body.category.toUpperCase(),
    user: req.user._id
  }

  const product = new Product(data)

  await product.save()

  res.status(201).json(product)
}

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}