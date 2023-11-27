const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const Cuidador = require("../models/cuidadoresModel");
const Enfermero = require("../models/enfermerosModel");


const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    estado,
    direccion,
    telefono,
    horasDeCuidador,
    turnos,
    cuidadores,
    ved,
    enfermeros,
    observaciones,
    insumos,
  } = req.body;

  if (
    !name ||
    !estado ||
    !direccion ||
    !telefono ||
    !horasDeCuidador ||
    !turnos ||
    !ved ||
    !observaciones ||
    !insumos
  ) {
    return res.status(400).json({ error: "Rellena todos los campos obligatorios" });
  }


  const cuidadoresNames = await Promise.all(
  cuidadores.map(async (cuidadorName) => {
    const cuidador = await Cuidador.findOne({ name: cuidadorName });
    if (!cuidador) {
      console.log(`Cuidador no encontrado para ${cuidadorName}`);
      return null;
    }
    return cuidador._id;
  })
);
  
  const enfermerosNames = await Promise.all(
    enfermeros.map(async (enfermeroName) => {
      const enfermero = await Enfermero.findOne({ name: enfermeroName });
      console.log(`Enfermero buscado para ${enfermeroName}:`, enfermero);
      return enfermero ? enfermero._id : null;
    })
  );

  const product = await Product.create({
    user: req.user.id,
    name,
    estado,
    direccion,
    telefono,
    horasDeCuidador,
    turnos,
    cuidadores: cuidadoresNames,
    ved,
    enfermeros: enfermerosNames,
    observaciones,
    insumos,
  });

  // Obtener el producto recién creado con los nombres de cuidadores y enfermeros
  const createdProduct = await Product.findById(product._id)
    .populate({ path: 'cuidadores', select: 'name' })  // Poblar cuidadores y solo seleccionar el campo 'name'
    .populate({ path: 'enfermeros', select: 'name' })  // Poblar enfermeros y solo seleccionar el campo 'name'
    .exec();

  res.status(201).json(createdProduct);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {

  try {
    const products = await Product.find()
      .populate('cuidadores enfermeros')
      .exec();

    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});


// Get single product
/*
const getProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  // Verifica si productId es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product ID");
  }

  const product = await Product.findById(productId);
});*/
// Get single product

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.deleteOne();
  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { name,
     estado,
     direccion,
     telefono,
     horasDeCuidador, 
     turnos, 
     cuidadores, 
     ved, 
     enfermeros, 
     observaciones, 
     insumos
    } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }



  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name, 
      estado,
      direccion,
      telefono,
      horasDeCuidador,
      turnos, 
      cuidadores, 
      ved, 
      enfermeros, 
      observaciones, 
      insumos,
  
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};