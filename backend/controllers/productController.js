const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const mongoose = require("mongoose");


// Controlador para crear un producto
const createProduct = asyncHandler(async (req, res) => {

  // Extrae los datos del cuerpo de la solicitud
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

  console.log("Datos recibidos en la solicitud POST:", req.body);
  // Validación: Comprueba si los campos requeridos están en blanco
  if (
    !name || !name.trim() ||
    !estado || !estado.trim() ||
    !direccion || !direccion.trim() ||
    !telefono || !telefono.trim() ||
    !horasDeCuidador || !horasDeCuidador.trim() ||
    !turnos || !turnos.trim() ||
    !cuidadores || !cuidadores.trim() ||
    !ved || !ved.trim() ||
    !enfermeros || !enfermeros.trim() ||
    !observaciones || !observaciones.trim() ||
    !insumos || !insumos.trim()
  ) {
    res.status(400);
    throw new Error("Rellena todos los campos");
  }

  // Crea el producto
  const product = await Product.create({
    user: req.user.id, // Supongo que req.user.id contiene el ID del usuario que realiza la solicitud
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
  });

  // Envía una respuesta con el producto creado y un código de respuesta 201 (Created)
  res.status(201).json(product);
});


// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
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